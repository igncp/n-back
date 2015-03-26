import subprocess
import socket


class NBackCommon:
  def start_server(self):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('127.0.0.1', 7171))
    if result != 0:
      subprocess.Popen(['grunt', 'server'])
