---
title: "Python - Scrapping"
layout: post  
post-image: "/assets/images/informatique/website.png"  
description: "Extraire des informations d'un site web"  
categories:
  - Fiche
---


# Extraire des informations d'un site web  

## Accéder au site

La méthode CFFI est très efficace avec les sites protégé par CloudFlare.

### Méthode CFFI

``` 
from curl_cffi import requests 

source = requests.get(url, impersonate="chrome").text
```

### Selenium

```
from selenium import webdriver
```

#### Firefox
``` 
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service

service = Service("/snap/bin/firefox.geckodriver")
options = Options()

user_agent = f"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:136.0) Gecko/20100101 Firefox/136.0"

options.set_preference("general.useragent.override", user_agent)
options.set_preference('dom.webdriver.enabled', False)
options.set_preference('useAutomationExtension', False)
options.set_preference("app.update.auto", False)
options.set_preference("general.startup.browser ", True)

options.add_argument("--profile")
options.add_argument("/home/user_xxx/snap/firefox/version_xxx/.mozilla/firefox/profile_xxx")

driver = webdriver.Firefox(service=service, options=options)
```

#### Chrome

``` 
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

service = Service("/snap/bin/chromium.chromedriver")
options = Options()

options.add_argument(f'--user-data-dir=/home/jaden/snap/chromium/common/chromium/Profile 1')
options.add_argument(f'--profile-directory=Profile 1')
options.add_argument(f'--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.52 Safari/537.36')
options.add_argument('--no-sandbox')
options.add_argument('--start-maximized')
options.add_argument('--disable-infobars')
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--disable-browser-side-navigation')
options.add_argument("--remote-debugging-port=9222")
options.add_argument('--disable-gpu')
options.add_argument("--log-level=3")
options.add_experimental_option("detach", True)
options.add_experimental_option('useAutomationExtension', False)
options.add_argument("--disable-blink-features=AutomationControlled") 
options.add_experimental_option("excludeSwitches", ["enable-automation"]) 


driver = webdriver.Chrome(service=service, options=options)
```

Autre version de chrome :

``` 
import undetected_chromedriver as uc

driver = uc.Chrome(headless=True, use_subprocess=False)
```

Et ensuite :
``` 
driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

driver.get(url)
driver.implicitly_wait(5)

source = driver.page_source
```

Prend un screenshot de la partie visible : `driver.save_screenshot(screenshot_path)`  

Ferme le navigateur : `driver.exit()`

### Scraper

``` 
import cloudscraper

scraper = cloudscraper.create_scraper(browser={
        "browser": "firefox",
        "platform": "linux",
        "desktop": True
    })
    
source = scraper.get(url).text
```

``` 
import cfscrape

scraper = cfscrape.create_scraper()

source = scraper.get(url).content
```

## Parcourir le code source

``` 
from bs4 import BeautifulSoup

soup = BeautifulSoup(source, "html.parser")

# Trouver un élément avec les élements exactes
el = soup.find("iframe", class_="absolute inset-0")

# Trouver les élements qui correspondent à la requète CSS
elements = soup.select("ul#content > li.item")

# Accéder à la propriété d'un élement
href = el["href"]

# Récupérer le contenu textuelle d'un élement
content = el.get_text()
```