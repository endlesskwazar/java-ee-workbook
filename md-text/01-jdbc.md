# JDBC

# Зміст

${toc}

# JDBC. Що і навіщо?

**Java DataBase Connectivity** (англ. Java DataBase Connectivity — з'єднання з базами даних на Java), скорочено JDBC) — прикладний програмний інтерфейс Java, який визначає методи, з допомогою яких програмне забезпечення на Java здійснює доступ до бази даних. JDBC — це платформо-незалежний промисловий стандарт взаємодії Java-застосунків з різноманітними СУБД, реалізований у вигляді пакета java.sql, що входить до складу Java SE.

Переваги JDBC:
- Легкість розробки: розробник може не знати специфіки бази даних, з якою працює;
- Код не змінюється, якщо компанія переходить на іншу базу даних;
- Не треба встановлювати громіздку клієнтську програму;
- До будь-якої бази можна під'єднатись через легко описуваний URL.

JDBC включає в себе API для:
- З'єднання із базою даних
- Створення SQL запитів
- Виконання SQL запитів
- Робота із транзакціями і збережинимо процедурами

# JDBC. Концепція драйверів.

В основі JDBC лежить концепція так званих драйверів, що дозволяють отримувати з'єднання з базою даних по спеціально описаному URL. Драйвери можуть завантажуватись динамічно (під час роботи програми). Завантажившись, драйвер сам реєструє себе й викликається автоматично, коли програма вимагає URL, що містить протокол, за який драйвер «відповідає».

Нижче наведено архітектурну діаграму, яка показує розташування менеджера драйверів щодо драйверів JDBC та програми Java

![](../resources/img/jdbc/jdbc-img-1.jpg)

У всіх прикладах підключення до бази даних в Інтернеті ви обов'язково зустрінете ці рядки:

```java
Class.forName(driverClass);
Connection connection = DriverManager
        .getConnection(url, user, password);
```

Де driverClass - це рядок з повним ім'ям класу JDBC драйвера, наприклад org.h2.Driver для H2 Database або com.mysql.jdbc.Driver для MySql.

Всі основні сутності в JDBC API, з якими вам доведеться працювати, є інтерфейсами:

- Connection;
- Statement;
- PreparedStatement;
- CallableStatement;
- ResultSet;
- Driver;
- DatabaseMetaData.

JDBC драйвер конкретної бази даних як раз і надає реалізації цих інтерфейсів.

DriverManager - це Singlton, який містить інформацію про всі зареєстровані драйвери. Метод getConnection на підставі параметра URL знаходить java.sql.Driver відповідної бази даних і викликає у нього метод connect.

Так а навіщо ж виклик Class.forName ()?

Якщо подивитися джерельний код реалізації будь-якого драйвера він буде містити статичний блок ініціалізації такого виду:

```java
static {
    try {
        java.sql.DriverManager.registerDriver(new Driver());
    } catch (SQLException e) {
        throw new RuntimeException("Can't register driver!");
    }
}
```

Виклик Class.forName завантажує клас і цим гарантує виконання статичного блоку ініціалізації, а значить і реєстрацію драйвера в DriverManager.

# Основні JDBC компоненти.

Основні компоненти JDBC:
- DriverManager.
- Driver.
- Connection.
- Statement.
- ResultSet.
- SQLEXception.

## DriverManager

Клас DriverManager є рівнем управління в JDBC і знаходиться між користувачем і драйверами. Він відстежує всі доступні драйвери і управляє встановленням з'єднань між БД і відповідним драйвером. До того ж, клас DriverManager піклується про такі речі, як максимальний час підключення до БД і інше.

Для простих додатків єдиний корисний метод в цьому класі - це DriverManager.getConnection. Як можна здогадатися по його імені, він встановлює з'єднання з БД. JDBC дозволяє користувачеві викликати також наступні методи DriverManager: getDriver, getDrivers і registerDriver, і метод connect інтерфейсу Driver, але в більшості випадків краще перекласти відповідальність встановлення з'єднання на клас DriverManager.

## Driver

Цей інтерфейс обробляє зв'язок із сервером бази даних. Ви будете взаємодіяти безпосередньо з об'єктами Driver дуже рідко. Замість цього ви використовуєте об'єкти DriverManager, які керують об'єктами цього типу.

## Connection

Об'єкт Connection являє собою контекст зв'язку, тобто весь зв'язок із базою даних здійснюється лише через об'єкт з'єднання.

## Statement

Об'єкти, створені з цього інтерфейсу, використовуються для надсилання SQL-запитів до бази даних. Деякі похідні інтерфейси приймають параметри, крім виконання збережених процедур.

## ResultSet

Об'єкти ResultSet зберігають дані, отримані з бази даних після того, як ви виконуєте SQL-запит за допомогою об'єктів Statement. Він діє як ітератор, який дозволяє вам переміщатися за своїми даними.

## SQLException
Цей клас обробляє будь-які помилки, що виникають у додатку до бази даних.
SQLException є checked винятком і його всюди треба тягнути або обертати в try catch.

# Використання JDBC
## Налаштування середовища

JDBC API знаходиться в Java SE, а це означає, що для роботи з ним нам не потрібно завантажувати якісь бібліотеки, що не можна сказати про самих постачальників драйверів.

В залежності від того з якою базою даних ми працюємо потрібно завантажити відповідний jar - файл, або додати залежність, якщо використовується система сборки, на постачальника драйверів.

Наприклад, скачати jar - файл драйвера можна за посиланнями:
- MySQL – http://dev.mysql.com/downloads/connector/j/
- PostqreSLQ – http://jdbc.postgresql.org/download.html
- Oracle – http://www.oracle.com/technetwork/database/features/jdbc/index-091264.html

## Створення з'єднання із базою даних

### Підключення до Mysql

```java
Class.forName("com.mysql.jdbc.Driver");
Connection conn = DriverManager.getConnection("jdbc:mysql://hostname:port/dbname","username", "password");
conn.close();
```

### Підключення до PostgreSQL

```java
Class.forName("org.postgresql.Driver");
Connection connection = DriverManager.getConnection("jdbc:postgresql://hostname:port/dbname","username", "password");
connection.close();
```

### Підключення до Oracle

```java
Class.forName("oracle.jdbc.driver.OracleDriver");
Connection connection = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:mkyong","username","password");
connection.close();
```

## Виконання запитів

Для виконання запитів за допомогою JDBC можна використати Statement або PreparedStatement.

У PreparedStatement ви задаєте запит, в якому можете змінювати будь-які параметри. Наприклад, ваш запит повинен виконатися кілька разів з різними параметрами. Тоді це зручніше і швидше. У PreparedStatement всі строкові параметри автоматично перетворюються в рядки з escape-послідовностями. Зокрема, немає ніяких проблем з рядками, які містять лапки. А при використанні складання рядків і Statement вам про це треба дбати самим або ви отримаєте SQL injection.

Створення Statement:
```java
Statement statement = connection.createStatement();
statement.executeQuery("select* from users");
```

Існує кілька способів виконувати SQL-запити в залежності від типу цього запиту. Для цього у інтерфейсу Statement існує три різних методи: **executeQuery ()**, **executeUpdate ()**, а також **execute ()**. Розглянемо їх окремо.

Самий базовий метод **executeQuery ()** необхідний для запитів, результатом яких є один єдиний набір значень, таких як у запитів SELECT. Повертає ResultSet, який не може бути null навіть якщо у результату запиту не було знайдено значень.

Метод **execute ()** використовується, коли оператори SQL повертають більше одного набору даних, більше одного лічильника оновлень і інше. Метод повертає true, якщо результатом є ResultSet, як у запиту SELECT. Поверне false, якщо ResultSet відсутня, наприклад при запитах виду Insert, Update. 

Метод **executeUpdate ()** використовується для виконання операторів INSERT, UPDATE або DELETE, а також для операторів DDL (Data Definition Language - мова визначення даних), наприклад, CREATE TABLE і DROP TABLE. Результатом оператора INSERT, UPDATE, або DELETE є модифікація однієї або більше колонок в нулі або більше рядках таблиці. Метод executeUpdate () повертає ціле число, що показує, скільки рядків було модифіковано. Для виразів типу CREATE TABLE і DROP TABLE, які не оперують над рядками, що повертається методом executeUpdate () значення завжди дорівнює нулю.

Всі методи виконання SQL-запитів закривають попередній набір результатів (result set) у даного об'єкта Statement. Це означає, що перед тим як виконувати наступний запит над тим же об'єктом Statement, треба завершити обробку результатів попереднього (ResultSet).

Створення PreparedStatement:

```java
String sql = "select * from users where name = ?";
PreparedStatement preparedStatement = connection.preparedStatement(sql);
preparedStatement.setString(1, "value");
```

# Патерн DAO, використовуючи JDBC

## Створення нового проекту

Відкрийте Eclipse IDE і створіть новий Maven - проект:

![](../resources/img/jdbc/jdbc-img-2.png)

Встановіть галочку напроти Create a simple project(skip archetype selection)

![](../resources/img/jdbc/jdbc-img-3.png)

Встановіть Group Id і Artifact Id
- Group Id відноситься до організації в, якій ми працюємо
- Artifact Id - назва  проекту всередині організації

![](../resources/img/jdbc/jdbc-img-4.png)

В результаті ми отримаємо наступну структуру проекта в Eclipse

![](../resources/img/jdbc/jdbc-img-5.png)

- src/main/java - містить Java - класи
- pom.xml - файл maven, який містить деталі зборки проекту

Інші елементи в структурі проекту нас покищо не цікавлять.

## Додавання залежності H2

H2 - відкрита кроссплатформенная СУБД, повністю написана на мові Java.

Відкрийте pom.xml і додайте наступну залежність:

```xml
<dependency>
	<groupId>com.h2database</groupId>
	<artifactId>h2</artifactId>
	<version>1.4.197</version>
</dependency>
```

Після цього pom.xml виглядає так:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>ua.com.endlesskwazar.h2</groupId>
	<artifactId>jdbc</artifactId>
	<version>0.0.1-SNAPSHOT</version>

	<dependencies>
		<dependency>
			<groupId>com.h2database</groupId>
			<artifactId>h2</artifactId>
			<version>1.4.197</version>
		</dependency>
	</dependencies>
</project>
```

## Створення доменої моделі

Створіть новий клас Product.

![](../resources/img/jdbc/jdbc-img-8.png)

Вміст Product.java наступний:

```java
package jdbc.lb.domain;

public class Product {
	int id;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	String title;
	
	public Product(int id, String title, float price) {
		super();
		this.id = id;
		this.title = title;
		this.price = price;
	}

	float price;
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public Product() {}
	
	public float getPrice() {
		return price;
	}
	
	public Product(String title, float price) {
		this.title = title;
		this.price = price;
	}
	
	public void setPrice(float price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", title=" + title + ", price=" + price + "]";
	}
}
```

## Створення слоя доступу до даних - DAO

Створіть новий інтерфейс - Dao:

![](../resources/img/jdbc/jdbc-img-9.png)

Файл Dao.java має наступний вміст:

```java
package jdbc.lb.dao;

import java.util.List;

public interface Dao<T, Id> {
	List<T> getAll();
	T getById(Id id);
	T add(T entity);
	void remove(Id id);
	void update(T entity);
}
```

Створіть новий клас ProductDao, який реалізує Dao:

![](../resources/img/jdbc/jdbc-img-10.png)

Покищо ProductDAO містить лише заглушки для реалізації інтерфейсу Dao:

```java
package jdbc.lb.dao;

import java.util.List;

import jdbc.lb.domain.Product;

public class ProductDao implements Dao<Product, Integer> {

	public List<Product> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	public Product getById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	public Product add(Product entity) {
		// TODO Auto-generated method stub
		return null;
	}

	public void remove(Integer id) {
		// TODO Auto-generated method stub
		
	}

	public void update(Product entity) {
		// TODO Auto-generated method stub
		
	}

}
```

## Строка підключення

Додамо статичне, фінальне поле, яке міститиме деталі з'єданання із базою даних:

```java
public class ProductDao implements Dao<Product, Integer> {

	private final static String url = "jdbc:h2:mem:products";

	....
```

## Реалізація getAll

```java
public List<Product> getAll() {
	Connection conn = null;
	List<Product> list = null;
	
	try {
		conn = DriverManager.getConnection(url);
		String sql = "select* from products;";
		Statement statement = conn.createStatement();
		ResultSet rs = statement.executeQuery(sql);
		
		list = new ArrayList<Product>();
		while(rs.next()) {
			Product product = new Product();
			product.setId(rs.getInt(1));
			product.setTitle(rs.getString(2));
			product.setPrice(rs.getFloat(3));
			list.add(product);
		}
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	return list;
}
```

## Реалізація getById

```java
public Product getById(Integer id) {
	Connection conn = null;
	
	try {
		conn = DriverManager.getConnection(url);
		String sql = "select * from products where id = ?";
		PreparedStatement preparedStatement = conn.prepareStatement(sql);
		preparedStatement.setInt(1, id);
		ResultSet rs = preparedStatement.executeQuery();
		
		while(rs.next()) {
			Product product = new Product();
			product.setId(rs.getInt(1));
			product.setTitle(rs.getString(2));
			product.setPrice(rs.getFloat(3));
			return product;
		}
		
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	return null;
}
```

## Реалізація add

```java
public Product add(Product entity) {
		
	Connection conn = null;
	
	try {
		conn = DriverManager.getConnection(url);
		String sql = "insert into products(title, price) values(?,?)";
		PreparedStatement preparedStatement = conn.prepareStatement(sql);
		preparedStatement.setString(1, entity.getTitle());
		preparedStatement.setFloat(2, entity.getPrice());
		preparedStatement.executeUpdate();
		return entity;
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	return null;
}
```

## Реалізація remove

```java
public void remove(Integer id) {
	Connection conn = null;
	
	try {
		conn = DriverManager.getConnection(url);
		String sql = "delete from products where id = ?";
		PreparedStatement preparedStatement = conn.prepareStatement(sql);
		preparedStatement.setInt(1, id);
		preparedStatement.executeUpdate();
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
}
```

## Реалізація update

```java
public void update(Product entity) {
		
	Connection conn = null;
	
	try {
		conn = DriverManager.getConnection(url);
		String sql = "update products set title = ?, price = ? where id = ?";
		PreparedStatement preparedStatement = conn.prepareStatement(sql);
		preparedStatement.setString(1, entity.getTitle());
		preparedStatement.setFloat(2, entity.getPrice());
		preparedStatement.setInt(3, entity.getId());
		preparedStatement.executeUpdate();
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
}
```

## Створення конструктора для ініціалізації бази даних

Ми додамо в клас ProductDao конструктор, який буде створювати таблицю в базі даних, якщо вона ще не була створена. Код конструктора приведено нижче:

```java
public ProductDao() {
	Connection conn = null;
	
	try {
		conn = DriverManager.getConnection(url);
		String sql = "create table if not exists products("
				+ "id integer primary key auto_increment,"
				+ "title varchar(300),"
				+ "price float);";
		Statement statement = conn.createStatement();
		statement.execute(sql);
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
}
```

## Остаточний код ProductDao.java

```java
package jdbc.lb.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import jdbc.lb.domain.Product;

public class ProductDao implements Dao<Product, Integer> {

	private final static String url = "jdbc:h2:mem:products";
	
	public ProductDao() {
		Connection conn = null;
		
		try {
			conn = DriverManager.getConnection(url);
			String sql = "create table if not exists products("
					+ "id integer primary key auto_increment,"
					+ "title varchar(300),"
					+ "price float);";
			Statement statement = conn.createStatement();
			statement.execute(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public List<Product> getAll() {
		Connection conn = null;
		List<Product> list = null;
		
		try {
			conn = DriverManager.getConnection(url);
			String sql = "select* from products;";
			Statement statement = conn.createStatement();
			ResultSet rs = statement.executeQuery(sql);
			
			list = new ArrayList<Product>();
			while(rs.next()) {
				Product product = new Product();
				product.setId(rs.getInt(1));
				product.setTitle(rs.getString(2));
				product.setPrice(rs.getFloat(3));
				list.add(product);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}

	public Product getById(Integer id) {
		Connection conn = null;
		
		try {
			conn = DriverManager.getConnection(url);
			String sql = "select * from products where id = ?";
			PreparedStatement preparedStatement = conn.prepareStatement(sql);
			preparedStatement.setInt(1, id);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				Product product = new Product();
				product.setId(rs.getInt(1));
				product.setTitle(rs.getString(2));
				product.setPrice(rs.getFloat(3));
				return product;
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}

	public Product add(Product entity) {
		
		Connection conn = null;
		
		try {
			conn = DriverManager.getConnection(url);
			String sql = "insert into products(title, price) values(?,?)";
			PreparedStatement preparedStatement = conn.prepareStatement(sql);
			preparedStatement.setString(1, entity.getTitle());
			preparedStatement.setFloat(2, entity.getPrice());
			preparedStatement.executeUpdate();
			return entity;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}

	public void remove(Integer id) {
		Connection conn = null;
		
		try {
			conn = DriverManager.getConnection(url);
			String sql = "delete from products where id = ?";
			PreparedStatement preparedStatement = conn.prepareStatement(sql);
			preparedStatement.setInt(1, id);
			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void update(Product entity) {
		
		Connection conn = null;
		
		try {
			conn = DriverManager.getConnection(url);
			String sql = "update products set title = ?, price = ? where id = ?";
			PreparedStatement preparedStatement = conn.prepareStatement(sql);
			preparedStatement.setString(1, entity.getTitle());
			preparedStatement.setFloat(2, entity.getPrice());
			preparedStatement.setInt(3, entity.getId());
			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

}
```

## Тестування ProductDao

Створіть новий клас із методом public static void main:

![](../resources/img/jdbc/jdbc-img-11.png)

Код класа Main:

```java
package jdbc.lb;

import java.util.Arrays;

import jdbc.lb.dao.ProductDao;
import jdbc.lb.domain.Product;

public class Main {

	public static void main(String[] args) {
		
		ProductDao dao = new ProductDao();
		
		//add 3 products to database
		Arrays.asList(
				new Product("boots", (float)33.3),
				new Product("phone", (float)100.5),
				new Product("pc", 22)
				)
		.stream()
		.forEach(p -> dao.add(p));
		
		//Display all products
		dao.getAll().stream().forEach(System.out::println);
		
		//Update some product
		dao.getAll().stream().findAny().ifPresent(p -> {
			p.setTitle("updated");
			dao.update(p);
		});
		
		//Display all products after update
		dao.getAll().stream().forEach(System.out::println);
		
		//Remove some product
		dao.getAll().stream().findAny().ifPresent(p -> {
			dao.remove(p.getId());
		});
		
		//Display all products after remove
		dao.getAll().stream().forEach(System.out::println);
	}

}

```

Результат виконання додатку:

![](../resources/img/jdbc/jdbc-img-12.png)

# Завантажити проект

Проект доступний на репозиторії [java-ee-examples](https://github.com/endlesskwazar/java-ee-examples.git) branch: jdbc-example

# Домашнє завдання

Реалізуйте шаблон DAO з використанням JDBC. Модель згідно із варіантом.

## Варіанти

### Варіант 1

```
Employee{
	id: Integer,
	name: String,
	age: Integer
}
```

### Варіант 2

```
Phone{
	id: Integer,
	brand: String,
	model: String
}
```

### Варіант 3

```
Todo{
	id: Integer,
	title: String,
	dueDate: String | Date
}
```

### Варіант 4

```
Post{
	id: Integer,
	title: String,
	author: String
}
```

### Варіант 5

```
Book{
	id: Integer,
	title: String,
	ISBN: String
}
```

### Варіант 6

```
Car{
	id: Integer,
	brand: String,
	model: String
}
```

### Варіант 7

```
Article{
	id: Integer,
	title: String,
	text: String
}
```

### Варіант 8

```
OS{
	id: Integer,
	title: String,
	platform: String
}
```

### Варіант 9

```
Application{
	id: Integer,
	title: String,
	license: String
}
```

### Варіант 10

```
Song{
	id: Integer,
	title: String,
	artist: String
}
```

# Контрольні запитання

1. Що таке JDBC? Назвіть основні компоненти JDBC.
2. Поясніть концепцію постачальників драйверів.
3. Яка різниця між Statement і PreparedStatement?
4. Яка різниця між executeQuery() і executeUpdate() і execute()?