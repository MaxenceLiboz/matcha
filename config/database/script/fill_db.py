import mysql.connector

try:
    
  mydb = mysql.connector.connect(
    host="localhost",
    user="anas",
    password="",
    port="8306",
    database="data"
  )

  mycursor = mydb.cursor()

  sql = "INSERT INTO User (email, username, last_name, first_name, password_hash) VALUES  (%s, %s, %s, %s, %s)"
  val = [
    ('peter@test.com', 'peter', 'Test', 'Peter', '1234'),
    ('amy@test.com', 'amy', 'Test', 'Amy', '1234'),
  ]

  mycursor.executemany(sql, val)

  mydb.commit()

except Exception as e:

  print(f'{str(e)}')
  exit(1)


print(mycursor.rowcount, "was inserted.") 