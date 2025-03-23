import path from 'path';

// Alternative path for templates in public directory
const htmlTemplatePath = path.join(process.cwd(), 'public', 'email-templates', 'volunteer-application.html');
const textTemplatePath = path.join(process.cwd(), 'public', 'email-templates', 'volunteer-application.txt');