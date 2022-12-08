/**
 * Assign __env to the root window object.
 *
 * The goal of this file is to allow the deployment
 * process to pass in environment values into the application.
 *
 * The deployment process can overwrite this file to pass in
 * custom values:
 *
 * window.__env = window.__env || {};
 * window.__env.url = 'some-url';
 * window.__env.key = 'some-key';
 *
 * Keep the structure flat (one level of properties only) so
 * the deployment process can easily map environment keys to
 * properties.
 */

(function (window) {
    window.__env = window.__env || {};

    // API url
    window.__env.apiUrl = 'https://localhost:44374/';
    // Base Path
    window.__env.basePath = '/';

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
}(this));