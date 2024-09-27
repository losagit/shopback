const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

module.exports = async (data) => {
    var templateHtml = ""
    if(data.id_venta){
        templateHtml = fs.readFileSync(path.join(process.cwd(), '/src/templates/invoice_venta.handlebars'), 'utf8');    
    }else{
        templateHtml = fs.readFileSync(path.join(process.cwd(), '/src/templates/invoice_compra.handlebars'), 'utf8');    
    }
    var template = handlebars.compile(templateHtml);
    var html = template(data);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html);

    const pdfBuffer = await page.pdf();

    await page.close();
    await browser.close();

    return pdfBuffer;
};