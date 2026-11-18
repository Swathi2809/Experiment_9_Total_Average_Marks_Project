const { Builder, By, until } = require("selenium-webdriver");
const assert = require("node:assert/strict");

const APP_URL = "http://127.0.0.1:5500";

(async function runTests() {
    const driver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.get(APP_URL);

        // Test 1: normal marks calculation
        await driver.findElement(By.id("subject1")).sendKeys("80");
        await driver.findElement(By.id("subject2")).sendKeys("90");
        await driver.findElement(By.id("subject3")).sendKeys("70");
        await driver.findElement(By.id("calculate-button")).click();

        await driver.wait(
            until.elementTextIs(
                driver.findElement(By.id("total-result")),
                "Total: 240"
            ),
            5000
        );

        assert.equal(
            await driver.findElement(By.id("average-result")).getText(),
            "Average: 80.00"
        );

        console.log("PASS: Test 1 - Total 240 and average 80.00.");

        // Test 2: decimal average
        await driver.findElement(By.id("subject1")).clear();
        await driver.findElement(By.id("subject2")).clear();
        await driver.findElement(By.id("subject3")).clear();

        await driver.findElement(By.id("subject1")).sendKeys("75");
        await driver.findElement(By.id("subject2")).sendKeys("80");
        await driver.findElement(By.id("subject3")).sendKeys("85");
        await driver.findElement(By.id("calculate-button")).click();

        assert.equal(
            await driver.findElement(By.id("total-result")).getText(),
            "Total: 240"
        );
        assert.equal(
            await driver.findElement(By.id("average-result")).getText(),
            "Average: 80.00"
        );

        console.log("PASS: Test 2 - Recalculation works for a second input set.");

        // Test 3: minimum boundary values
        await driver.findElement(By.id("subject1")).clear();
        await driver.findElement(By.id("subject2")).clear();
        await driver.findElement(By.id("subject3")).clear();

        await driver.findElement(By.id("subject1")).sendKeys("0");
        await driver.findElement(By.id("subject2")).sendKeys("0");
        await driver.findElement(By.id("subject3")).sendKeys("0");
        await driver.findElement(By.id("calculate-button")).click();

        assert.equal(
            await driver.findElement(By.id("total-result")).getText(),
            "Total: 0"
        );
        assert.equal(
            await driver.findElement(By.id("average-result")).getText(),
            "Average: 0.00"
        );

        console.log("PASS: Test 3 - Zero marks boundary case.");
        console.log("\nAll Selenium test cases passed.");
    } finally {
        await driver.quit();
    }
})();
