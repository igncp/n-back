import selenium_base
import subprocess
import socket
import unittest


class NBackCommon(unittest.TestCase, selenium_base.SeleniumBase):
  def setUp(self):
    self.start_server()
    self.start_driver()

  def tearDown(self):
    self.close_browser()
    
  def start_server(self):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('127.0.0.1', 7171))
    if result != 0:
      subprocess.Popen(['grunt', 'server'])
