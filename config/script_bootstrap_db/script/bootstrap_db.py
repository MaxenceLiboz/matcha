import mysql.connector
from faker import Faker
import random
import os
import time

try:

    # CREATING A CONNECTION TO THE DATABASE

    db_host = os.environ.get("MYSQL_HOST", 'db')
    db_user = os.environ.get("MYSQL_USER")
    db_pass = os.environ.get("MYSQL_PASSWORD")
    db_port = int(os.environ.get("MYSQL_PORT", 3306))
    db_name = os.environ.get("MYSQL_DATABASE")
    
    mydb = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_pass,
        port=db_port,
        database=db_name
    )

    mycursor = mydb.cursor()

    # CLEARING THE DATABASE

    mycursor.execute(f'USE {db_name}')
    mycursor.execute("SHOW TABLES")

    rows = mycursor.fetchall()

    mycursor.execute("SET FOREIGN_KEY_CHECKS = 0")

    for row in rows:
        mycursor.execute(f'TRUNCATE {row[0]}')

    mycursor.execute("SET FOREIGN_KEY_CHECKS = 1")

    # GENERATE FAKE DATA

    fake = Faker()

    val_user = []
    val_profile = []
    val_location = []
    val_tag = []
    val_user_tag = []

    genders = ["Male", "Female", "Other"]
    sexual_preferences = ["Heterosexual", "Homosexual", "Other"]
    now = time.localtime()
    f = '%Y-%m-%d %H:%M:%S'

    tag_list = fake.get_words_list()

    for i in range(500):

        user_id = i + 1
        
        # USER TABLE
        email = fake.unique.email()
        username = fake.unique.user_name()
        last_name = fake.unique.last_name()
        first_name = fake.unique.first_name()
        password_hash = fake.unique.password()

        val_user.append((email, username, last_name, first_name, password_hash))

        # PROFILE TABLE
        age = random.randint(18, 80)
        gender = random.choice(genders)
        sexual_preference = random.choice(sexual_preferences)
        frame_rating = random.randint(1, 10)
        current_timestamp = time.strftime(f, now)

        val_profile.append((user_id, age, gender, sexual_preference, frame_rating, current_timestamp, current_timestamp))

        # LOCATION TABLE
        location = fake.location_on_land()
        latitude = location[0]
        longitude = location[1]
        city = location[2]

        val_location.append((user_id, latitude, longitude, city, current_timestamp, current_timestamp))

        # TAG TABLE
        tag_name = fake.unique.word()

        val_tag.append((tag_name, current_timestamp, current_timestamp))

        # USER_TAG TABLE
        tag_tab = []
        for n in range(5):
            random_tag = random.randint(1, 500)

            while random_tag in tag_tab:
                random_tag += 1
                if random_tag > 500:
                    random_tag = 1
            
            tag_tab.append(random_tag)
            val_user_tag.append((user_id, random_tag, current_timestamp, current_timestamp))
                



    
    # FILLING TABLES

    sql_user = "INSERT INTO User (email, username, last_name, first_name, password_hash) VALUES  (%s, %s, %s, %s, %s)"
    sql_profile = "INSERT INTO Profile (user_id, age, gender, sexual_preference, frame_rating, created_at, updated_at) VALUES  (%s, %s, %s, %s, %s, %s, %s)"
    sql_location = "INSERT INTO Location (user_id, latitude, longitude, city, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s)"
    sql_tag = "INSERT INTO Tag (name, created_at, updated_at) VALUES (%s, %s, %s)"
    sql_user_tag = "INSERT INTO User_Tag (user_id, tag_id, created_at, updated_at) VALUES (%s, %s, %s, %s)"

    mycursor.executemany(sql_user, val_user)
    mycursor.executemany(sql_profile, val_profile)
    mycursor.executemany(sql_location, val_location)
    mycursor.executemany(sql_tag, val_tag)
    mycursor.executemany(sql_user_tag, val_user_tag)

    mydb.commit()

except Exception as e:

    print(f'{str(e)}')
    exit(1)


print(mycursor.rowcount, "was inserted.") 