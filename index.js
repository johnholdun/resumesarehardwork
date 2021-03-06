require('dotenv').config()
const fetch = require('node-fetch')
const fse = require('fs-extra')
const Handlebars = require('handlebars')
const path = require('path')
const PrismicDOM = require('prismic-dom')

const { PRISMIC_REPO_NAME, PRISMIC_ACCESS_TOKEN } = process.env

;(async () => {
  const { refs: [{ ref }] } =
    await fetch(`https://${PRISMIC_REPO_NAME}.cdn.prismic.io/api/v2?access_token=${PRISMIC_ACCESS_TOKEN}`)
      .then(r => r.json())

  const { results: [{ data }] } =
    await fetch(`https://${PRISMIC_REPO_NAME}.cdn.prismic.io/api/v2/documents/search?ref=${ref}&access_token=${PRISMIC_ACCESS_TOKEN}`)
      .then(r => r.json())

  const result = {}
  result.title = data.title[0].text
  result.body = PrismicDOM.RichText.asHtml(data.body)
  result.faq = data.faq.map(({ question, answer }) => {
    return {
      question: PrismicDOM.RichText.asHtml(question),
      answer: PrismicDOM.RichText.asHtml(answer)
    }
  })
  result.seoDescription = data.seo_description[0].text

  const template = Handlebars.compile((await fse.readFile(path.join(__dirname, 'templates', 'home.hbs'))).toString())

  await fse.copy(path.join(__dirname, 'static'), path.join(__dirname, '/public'))
  await fse.outputFile(path.join(__dirname, 'public', '/index.html'), template(result))
})()
