# My-OT 
This repo represents a static webpage that is hosted at https://www.my-ot.eu

The page is hosted on azure and each push to main triggers an update to the page


## Workflow Overview

This project uses two primary branches to manage the development and deployment process:
- **`main`**: This is the primary development branch. All feature development, bug fixes, and enhancements are merged here.
- **`prod`**: This branch is used for production deployments. It is automatically updated from the `main` branch through a GitHub Actions workflow that also handles version incrementing.

## Automatic bump version 

For each push to main, the version string in `script.js` will be automatically incremented (the patch part). Do change the patch number, only the minor/major.