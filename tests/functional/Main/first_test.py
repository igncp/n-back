from importer import common


class NBackFunctional(common.NBackCommon):
  def test_true(self):
    self.go_to('/')
    self.assertEquals(1, 1)
