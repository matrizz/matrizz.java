const puppeteer = require("puppeteer");
const sharp = require("sharp");
const fs = require("fs");

async function captureFullScreen(url, outputScreenshot) {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--start-fullscreen"], // Modo tela cheia
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // Ajusta para tela cheia (modo F11)
    await page.evaluate(async () => {
        const scrollDistance = 500; // Distância de cada scroll (500px)
        for (let i = 0; i < 6; i++) {
            window.scrollBy(0, scrollDistance);
            await new Promise(resolve => setTimeout(resolve, 500)); // Aguarda 500ms entre cada scroll
        }
    });
    await page.setViewport({ width: 1920, height: 1080 }); // Define a resolução desejada

    // Captura a tela inteira
    await page.screenshot({ path: outputScreenshot, fullPage: true });

    console.log(`Captura de tela salva em: ${outputScreenshot}`);
    await browser.close();
}

async function cropImage(inputFile, outputFile, left, top, width, height) {
    try {
        await sharp(inputFile)
            .extract({ left, top, width, height }) // Define coordenadas e dimensões do corte
            .toFile(outputFile);

        console.log(`Imagem recortada salva em: ${outputFile}`);
    } catch (error) {
        console.error("Erro ao recortar a imagem:", error);
    }
}

async function main(playerName, playerTag) {
    const url = `https://tracker.gg/valorant/profile/riot/${playerName}%23${playerTag}/overview`
    const screenshotPath = "./tracker/full_screen_screenshot.png"
    const croppedPath = "./cropped_image.png"

    // Captura a tela inteira
    await captureFullScreen(url, screenshotPath);

    // Define as coordenadas e dimensões para o corte
    const left = 200; // Posição X
    const top = 100; // Posição Y
    const width = 800; // Largura do corte
    const height = 600; // Altura do corte

    // Recorta a imagem capturada
    if (fs.existsSync(screenshotPath)) {
        await cropImage(screenshotPath, croppedPath, left, top, width, height);
    } else {
        console.error("Erro: A captura de tela não foi encontrada!");
    }
}

module.exports = { main }