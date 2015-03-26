import unittest
import selenium_base
import common


class NBackFunctional(unittest.TestCase, selenium_base.SeleniumBase, common.NBackCommon):
  def setUp(self):
    self.start_server()
    self.start_driver()

  def tearDown(self):
    self.close_browser()

  def test_true(self):
    self.go_to('/')
    self.assertEquals(1, 1)
