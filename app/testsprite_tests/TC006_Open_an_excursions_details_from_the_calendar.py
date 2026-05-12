import asyncio
import re
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",
                "--disable-dev-shm-usage",
                "--ipc=host",
                "--single-process"
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        # Wider default timeout to match the agent's DOM-stability budget;
        # auto-waiting Playwright APIs (expect, locator.wait_for) inherit this.
        context.set_default_timeout(15000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> navigate
        await page.goto("http://localhost:3004")
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=5000)
        except Exception:
            pass
        
        # -> Scroll to the calendar section and open the details for the first upcoming excursion (click the excursion card/image).
        # Scroll to the calendar section and open the details for the first upcoming excursion (click the excursion card/image).
        elem = page.locator("xpath=/html/body/div/div/main/section/div/div[3]/div/div[2]/div/div/img").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Open the first upcoming excursion's details (click the calendar entry for '30 MAIO / Serra Negra & Águas de Lindóia') so the details view is shown.
        # link "MAIO 30 SÁB Circuito das Águas Serra Neg..."
        elem = page.locator("xpath=/html/body/div/div/main/section[2]/div/div[2]/a").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Click the first upcoming excursion's card (element index 1126) to open its details and then verify the details view appears and the calendar remains visible.
        # link "MAIO 30 SÁB Circuito das Águas Serra Neg..."
        elem = page.locator("xpath=/html/body/div/div/main/section[2]/div/div[2]/a").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # -> Click the 'Reservar vaga' control for the first excursion (element 1182) to open the details/reservation view and then verify the details are shown and the calendar remains visible.
        # link "Reservar vaga"
        elem = page.locator("xpath=/html/body/div/div/main/section[4]/div/div[2]/div/a").nth(0)
        await elem.wait_for(state="visible", timeout=10000)
        await elem.click()
        
        # --> Assertions to verify final state
        assert await page.locator("xpath=//*[contains(., 'Reservar vaga')]").nth(0).is_visible(), "The excursion details should show the Reservar vaga control after opening the excursion"
        assert await page.locator("xpath=//*[contains(., 'MAIO')]").nth(0).is_visible(), "The calendar should remain visible on the page after opening the excursion details"
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    