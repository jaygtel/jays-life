# Jays Life

Jays Life is a personal web application built with Node.js and Express. The primary purpose of this project is to provide a modern, minimalist personal website that includes a contact form with integration to MailGun for sending emails.

This project was created to demonstrate the use of Node.js, Express, Handlebars, and other modern web development technologies to build a responsive and functional personal website. The contact form is designed to allow users to easily send messages, which are then handled by the MailGun service for email delivery.

Features of the project include:
- A clean and responsive design
- A contact form with client-side validation and AJAX submission
- Integration with MailGun for email sending

## Getting Started

**PUBLIC NOTE** Although this project has been set up for my personal use, it is entirely possible for you to clone it and use it for yourselves.  You will just have to change the names and so on that needs to be changed to match your own project.  You **MUST** also include the LICENSE.md file in your project, although you may rename it to LICENSE.txt or LICENSE.html if your specific project does not use files with the .md extensions.

### Development Setup

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/jays-life.git
   ```
2. **cd into the cloned repository**:
   ```sh
   cd jays-life
   ```
3. **Install Dependancies**:
   ```sh
   npm install
   ```
4. **Rename .env-sample**:
   ```sh
   mv .env-sample .env
   ```
5. **Start the development server**:
   ```sh
   gulp dev
   ```

### Preparing for Production

This will compile the Sass files, minify the JavaScript and CSS, optimize the images, and create a zip archive of the project in the dist directory.

1. **Build the project and create a zip archive**:
   ```sh
   gulp zip
   ```

### Production Setup

1. **SCP the zip archive created in the previous step to your production machine**:
   ```sh
   scp dist/jays-life-1.0.0.zip user@yourserver.com:~/jays-life-1.0.0.zip
   ```
2. **SSH into your production server**:
   ```sh
   ssh yourusername@yourserver.com
   ```
3. **Unzip the archive**:
   ```sh
   unzip jays-life-1.0.0.zip -d jays-life && cd jays-life
   ```
4. **Install dependencies on the production server**:
   ```sh
   npm install --production
   ```
5. **Start the application with PM2**:
   ```sh
   pm2 start ecosystem.config.js --env production
   ```

### Environment Variables

The following environment variables need to be configured in the .env file:

- PORT: The port on which the application will run (e.g., 4080).
- MAILGUN_API_KEY: Your MailGun API key.
- MAILGUN_DOMAIN: Your MailGun domain.
- MAILGUN_FROM: The email address from which emails will be sent.
- MAILGUN_TO: The email address to which contact form submissions will be sent.
- LANGUAGE: The language setting for the application (e.g., en-gb).

#### Example of how to write .env variables

You will need to ensure that all of these are set in the .env file correctly, as they are used as variables throughout the code.

```docker
PORT=3000
LANGUAGE=en
MAILGUN_API_KEY=api-key-goes-here
MAILGUN_DOMAIN=main-gun-domain-goes-here
MAILGUN_FROM=the-from-address-you-want-to-use
MAILGUN_TO=the-address-you-want-mail-sent-to
```