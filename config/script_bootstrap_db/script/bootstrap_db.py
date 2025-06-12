import mysql.connector
from faker import Faker
import bcrypt
from randomuser import RandomUser
import random
import os
import time

val_user = []
val_profile = []
val_location = []
val_tag = []
val_user_tag = []
val_picture = []
email_list = []
username_list = []
user_id = 1

def generate_requests_data(user_list, is_french=False, latitude='', longitude='', city=''):

    global val_user 
    global val_profile
    global val_location
    global val_tag
    global val_user_tag
    global val_picture
    global email_list
    global username_list
    global user_id 

    sexual_preferences = ["Heterosexual", "Homosexual", "Other"]
    now = time.localtime()
    f = '%Y-%m-%d %H:%M:%S'

    # Generate an hash
    password = os.environ.get("PROFILE_PASSWORD")
    bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hash_pw = bcrypt.hashpw(bytes, salt)


    for user in user_list:

        # USER TABLE
        email = user.get_email()
        username = user.get_username()

        if email in email_list or username in username_list:
            email = fake.unique.email()
            username = fake.unique.user_name()

        last_name = user.get_last_name()
        first_name = user.get_first_name()
        email_list.append(email)
        username_list.append(username)

        val_user.append((email, username, last_name, first_name, hash_pw))

        # PROFILE TABLE
        age = user.get_age()
        gender = user.get_gender()
        sexual_preference = random.choice(sexual_preferences)
        fame_rating = random.randint(1, 10)
        current_timestamp = time.strftime(f, now)

        val_profile.append((user_id, age, gender, sexual_preference, fame_rating, current_timestamp, current_timestamp))

        # PICTURE TABLE
        picture_path = user.get_picture()

        val_picture.append((user_id, picture_path, 'jpg', 1, current_timestamp, current_timestamp))

        # LOCATION TABLE
        if is_french == False:
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
        for _ in range(5):
            random_tag = random.randint(1, 500)

            while random_tag in tag_tab:
                random_tag += 1
                if random_tag > 500:
                    random_tag = 1

            tag_tab.append(random_tag)
            val_user_tag.append((user_id, random_tag, current_timestamp, current_timestamp))

        user_id += 1



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

    user_list = RandomUser.generate_users(400, get_params={'exc': 'location'})
    generate_requests_data(user_list)

    user_list = RandomUser.generate_users(50, get_params={'exc': 'location', 'nat': 'fr'})
    latitude_Paris = 48.866667
    longitude_Paris = 2.333333 
    generate_requests_data(user_list, True, latitude_Paris, longitude_Paris, 'Paris')

    user_list = RandomUser.generate_users(50, get_params={'exc': 'location', 'nat': 'fr'})
    latitude_Lyon = 45.750000
    longitude_Lyon = 4.850000
    generate_requests_data(user_list, True, latitude_Lyon, longitude_Lyon, 'Lyon')

    # FILLING TABLES

    sql_user = "INSERT INTO User (email, username, last_name, first_name, password_hash) VALUES  (%s, %s, %s, %s, %s)"
    sql_profile = "INSERT INTO Profile (user_id, age, gender, sexual_preference, fame_rating, created_at, updated_at) VALUES  (%s, %s, %s, %s, %s, %s, %s)"
    sql_picture = "INSERT INTO Picture (user_id, ref, mime_type, is_profile, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s)"
    sql_location = "INSERT INTO Location (user_id, latitude, longitude, city, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s)"
    sql_tag = "INSERT INTO Tag (name, created_at, updated_at) VALUES (%s, %s, %s)"
    sql_user_tag = "INSERT INTO User_Tag (user_id, tag_id, created_at, updated_at) VALUES (%s, %s, %s, %s)"

    mycursor.executemany(sql_user, val_user)
    mycursor.executemany(sql_profile, val_profile)
    mycursor.executemany(sql_picture, val_picture)
    mycursor.executemany(sql_location, val_location)
    mycursor.executemany(sql_tag, val_tag)
    mycursor.executemany(sql_user_tag, val_user_tag)

    mydb.commit()

except Exception as e:

    print(f'{str(e)}')
    exit(1)


print(mycursor.rowcount, "was inserted.") 