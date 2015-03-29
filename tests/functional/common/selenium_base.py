from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from pyvirtualdisplay import Display

import os
import time
import colorama

headless_tests = os.environ.get('NBACK_FUNCTIONAL_TESTS_HEADLESS', 'true')


class SeleniumBase:
  def start_driver(self):
    if headless_tests is 'true':
      display = Display(visible=0, size=(800, 600))
      display.start()
    self.d = webdriver.Firefox()
    self.base_url = 'http://localhost:7171'

  def close_browser(self):
    self.d.close()

  def go_to(self, relative_url):
    self.d.get(self.base_url + relative_url)

  def wait_until_presence_of_element_located(self, condition):
    self.wait().until(EC.presence_of_element_located(condition))

  def wait_until_element_to_be_clickable_by_css_selector_and_click(self, selector, number=1):
    self.wait_until_element_to_be_clickable_by_css_selector(selector)
    self.click_element_by_css_selector(selector, number)

  def wait_until_element_to_be_clickable_by_css_selector(self, selector):
    self.wait().until(EC.element_to_be_clickable((By.CSS_SELECTOR, selector)))

  def wait_until_element_to_be_clickable_by_id(self, id):
    self.wait().until(EC.element_to_be_clickable((By.ID, id)))

  def wait_until_element_to_be_clickable_by_id_and_click(self, id, wait=0):
    self.wait_until_element_to_be_clickable_by_id(id)
    time.sleep(wait)
    self.click_element_by_id(id)

  def wait_until_presence_of_input_located_by_name(self, name):
    self.wait_until_presence_of_element_located((By.NAME, name))

  def wait_until_presence_of_element_located_by_css_selector(self, selector):
    self.wait_until_presence_of_element_located((By.CSS_SELECTOR, selector))

  def click_element_by_id(self, id):
    self.d.find_element_by_id(id).click()

  def click_element_by_css_selector(self, selector, number=1):
    self.d.find_elements_by_css_selector(selector)[number - 1].click()

  def find_by_css_selector_and_send_keys(self, selector, text):
    self.wait_until_presence_of_element_located_by_css_selector(selector)
    self.d.find_element_by_css_selector(selector).send_keys(text)

  def get_current_relative_url(self):
    # self.d.current_url # this way it doesn't get the latest url
    absoule_url = self.script('document.URL;')
    return absoule_url.replace(self.base_url, '')

  def wait_seconds(self, seconds):
    time.sleep(seconds)

  def script(self, script_string):
    return self.d.execute_script('return ' + script_string)

  def script_fn_with_arguments(self, function, arguments):
    script_string = '{0}({1})'.format(function, arguments)
    return self.script(script_string)

  def script_fn_with_string_argument(self, function, string_argument):
    final_string_argument = '"' + string_argument + '"'
    return self.script_fn_with_arguments(function, final_string_argument)

  def script_with_message(self, script_string):
    result, message = self.script(script_string)
    if message: print('\n\n' + message + '\n')
    return result

  def get_console_output(self):
    entries = 'console logs:'
    for entry in self.d.get_log('browser'):
      entries += '\n' + entry
    return entries

  def refresh_current_page(self):
    self.d.refresh()

  def log_in_terminal(self, message):
    colorama.init()
    final_message = '\n\nSELENIUM_TERMINAL_LOG: ' + str(message) + '\n'
    final_message = colorama.Fore.CYAN + final_message
    print final_message

  def wait_till_condition(self, condition, *args, **kwargs):
    period = 0.1
    timeout = 10
    mustend = time.time() + timeout
    condition_passed = False
    while time.time() < mustend:
      if condition(*args, **kwargs):
        condition_passed = True
        break
      time.sleep(period)
    if condition_passed is False:
      raise Exception("wait_till_condition exceeded timeout")

  def assert_script_with_message(self, script):
    result = self.script_with_message(script)
    self.assertEquals(result, True)
