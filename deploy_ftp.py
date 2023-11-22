import ftplib
import os
import sys
from decouple import Config, RepositoryEnv, UndefinedValueError

# Read env variables for establishing FTP connection
try:
    env = Config(RepositoryEnv(".env"))

    host = env.get("FTP_SERVER_HOST")
    password = env.get("FTP_SERVER_PASSWORD")
    port = env.get("FTP_SERVER_PORT")
    username = env.get("FTP_SERVER_USERNAME")
    output_dir = env.get("FTP_SERVER_OUTPUT_DIR")
except UndefinedValueError as e:
    print(f"Env variable {e}")
except Exception as e:
    print(f"Error: {e}")

# Construct source directory path
src_dir = os.path.dirname(os.path.realpath(sys.argv[0]))
src_dir += "/src"

# Establish FTP connection
ftp = ftplib.FTP(host)
ftp.login(username, password)

# Send all source files to FTP server
for file_path in os.listdir(src_dir):
    abs_file_path = os.path.join(src_dir, file_path)
    with open(abs_file_path, "rb") as file:
        response_code = ftp.storbinary(f"STOR {output_dir}/{file_path}", file)
        print(
            f"Uploaded file \"{file_path}\" with response code {response_code}")

# Close FTP connection
ftp.close()
