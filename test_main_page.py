from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Scroll down slightly to show sticky header
    page.evaluate("window.scrollBy(0, 150)")
    page.wait_for_timeout(1000)

    # Scroll to About section
    page.evaluate("document.getElementById('about').scrollIntoView()")
    page.wait_for_timeout(1000)

    # Scroll to Footer
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(1000)

    # Scroll back to top
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(1000)

    # Take screenshot at the key moment (Hero Section)
    page.screenshot(path="/home/jules/verification/screenshots/main_page.png", full_page=True)
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    import os
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={'width': 1280, 'height': 800}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
