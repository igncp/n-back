from selenium import webdriver
from pyvirtualdisplay import Display


class SeleniumBase:
  def start_driver(self):
    display = Display(visible=0, size=(800, 600))
    display.start()
    self.d = webdriver.Firefox()
    self.base_url = 'http://localhost:7171'

  def close_browser(self):
    self.d.close()

  def go_to(self, relative_url):
    self.d.get(self.base_url + relative_url)
