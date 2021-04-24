# Resumes Are Hard Work

[https://resumesarehard.work](https://resumesarehard.work)

## Content and Deploying

This site uses [Prismic](https://prismic.io). Set environment variables for your Prismic repo following the examples in `.env.example`.

TODO: Figure out how to export the custom type for future use. This might only be available with a paid plan.

## Publishing

This site is entirely static. Running `yarn build` will fetch the latest content from Prismic, copy everything from `static/` into `public/`, and generate HTML files in `public/` using the Prismic content and the templates in `/templates/`.

## Local development

Run `yarn serve` to serve the built site locally at `http://localhost:8080`.

Run `yarn watch` to automatically rebuild the site when any files change. Note that publishing updated Prismic content will not automatically rebuild the site locally. To rebuild after changing content, either save any file or type `rs` in the `yarn watch` session.
