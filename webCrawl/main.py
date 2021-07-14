from selenium import webdriver
import json
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup

def get_etl_classes(username: str, password: str) -> list:
	# with open("info.json", "r") as f:
	#     data = json.load(f)
	#     username = data["etl_username"]
	#     password = data["etl_password"]

	options = webdriver.ChromeOptions()
	options.add_argument('headless')

	driver = webdriver.Chrome('webCrawl/chromedriver.exe', chrome_options=options) # mac의 경우 절대경로를 삽입
	driver.implicitly_wait(3)

	## url에 접근한다.
	driver.get('https://etl.snu.ac.kr/login.php')

	# 아이디와 비밀번호를 입력해준다. 
	driver.find_element_by_id('input-username').send_keys(username)
	driver.find_element_by_id('input-password').send_keys(password)
	# 로그인 버튼을 클릭한다
	driver.find_element_by_name('loginbutton').click()

	try:
		driver.find_element_by_name('next_bt').send_keys(Keys.ENTER)
	except:
		pass

	html = driver.page_source
	soup = BeautifulSoup(html, 'html.parser')
	courses = soup.select('.course-title > h3')

	etl_classes = [course.text.strip() for course in courses]

	driver.quit()

	return etl_classes
