# JSP

# Зміст

${toc}

# Що таке JSP?

**Java Server Pages** представляє технологію, яка дозволяє створювати динамічні веб-сторінки. Спочатку JSP (разом з Сервлетами) на зорі розвитку Java EE були домінуючим підходом до веб-розробки на мові Java. І хоча в даний час вони поступилося своїм місцем іншій технології - JSF, проте JSP продовжують широко використовуватися.

По суті Java Server Page або JSP є html-код з вкрапленнями коду Java. У той же час станиці jsp - це не стандартні html-сторінки. Коли приходить запит до певної сторінці JSP, то сервер обробляє її, генерує з неї код html і відправляє його клієнту. В результаті користувач після звернення до сторінці JSP бачить в своєму браузері звичайну html-сторінку.

Як і звичайні статичні веб-сторінки, файли JSP необхідно розміщувати на веб-сервері, до якого звичайні користувачі можуть звертатися по протоколу http, наприклад, набираючи в адресному рядку браузера потрібну адресу. Однак щоб сервер міг обробляти файли JSP, він повинен використовувати движок JSP (JSP engine), який також називають JSP-контейнером. Є безліч движків JSP, і всі вони реалізують одну й ту ж специфікацію і в цілому працюють однаково. Однак тим не менше при перенесенні коду з одного веб-сервера на інший можуть знадобитися невеликі зміни.

# Основи синтаксису JSP

Вміст сторінки JSP фактично ділиться на код html (а також css / javascript) і код на мові java. Для вставки коду Java на сторінку JSP можна використовувати п'ять основних елементів:

- Вирази JSP (JSP Expression)

- Скріплет JSP (JSP Scriplet)

- Оголошення JSP (JSP Declaration)

- Директиви JSP (JSP Directive)

- Коментарі JSP

## JSP Expression

Код, поміщений у тег вираження JSP, записується у вихідний потік відповіді. Так що вам не потрібно писати out.print () для запису даних. В основному це використовується для друку значень змінної або методу.

Синтаксис Jsp виразів

```jsp
<%=  statement %>
```

Наприклад,

```jsp
<%= "This is string" %>

<!-- a is variable -->
<%= a %>
```

## JSP Scriplet

Скриплет JSP дають можливість вставити будь-який код в метод сервлета, який буде створений при обробці сторінки, дозволяючи використовувати більшість конструкцій Java. Скріплет також мають доступ до тих же заздалегідь певним змінним, що і вирази. Тому, наприклад, для виведення значення на сторінку необхідно використовувати заздалегідь певну змінну out.

Синтаксис JSP Скриплетів:

```jsp

<% 
    for(int i = 0; i < 10; i++)
	    out.print(i);
%>

```

## JSP Declaration

Тег декларації JSP використовується для оголошення полів та методів. Код, написаний всередині тегу дессенції jsp, розміщується поза службою () методом автоматично створеного сервлета. Таким чином, він не виділяє пам'яті за кожним запитом.

Синтаксис JSP Declaration:
```jsp
<%! %>
```

Приклад:

```jsp
<%!
int testVar = 3;
%>

<%!
int getTestVar(){
	return testVar;
}
%>

<%= "Test var = " + testVar %>
<%= "Result of getTestVar() = " + getTestVar() %>
```

## JSP Directive

## JSP Comment

# JSP копілюється в Servlet

JSP транслюється в Java-сервлет і обробляє HTTP-запити і генерує відповіді як будь-який сервлет. Однак технологія JSP забезпечує більш зручний спосіб кодування сервлету.

Сторінка JSP обслуговує запити, як сервлет. Отже, життєвий цикл і багато можливостей сторінок JSP (зокрема, динамічні аспекти) визначаються технологією Java Servlet.

JSP-файл компілюються або при першому зверненні до нього, або при старті сервера. Це залежить від налаштувань сервера. Крім того, скомпільовані class-файли можуть зберігатися не в каталозі проекту, а в кеші сервера, тому ви можете їх не виявити навіть після звернення до jsp-сторінці.

# Приклад використання JSP

Створіть в середовищі Eclipse Maven - проект і виберіть architype - webapp:

![](../resources/img/jsp/img-4.png)

pom.xml буде такий же самий, як ми використовували для сервлетів:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>ua.com.endlesskwazar</groupId>
  <artifactId>jsp.demo</artifactId>
  <packaging>war</packaging>
  <version>0.0.1-SNAPSHOT</version>
  <name>jsp.demo Maven Webapp</name>
  <url>http://maven.apache.org</url>
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
    
    <dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>javax.servlet-api</artifactId>
			<version>4.0.1</version>
			<scope>provided</scope>
		</dependency>
  </dependencies>
  <build>
    <finalName>jsp.demo</finalName>
    
    <plugins>
			<plugin>
				<groupId>org.eclipse.jetty</groupId>
				<artifactId>jetty-maven-plugin</artifactId>
				<version>9.2.10.v20150310</version>

				<configuration>
					<scanIntervalSeconds>10</scanIntervalSeconds>
					<webApp>
						<contextPath>/jsp.demo</contextPath>
					</webApp>
				</configuration>

			</plugin>
		</plugins>
  </build>
</project>
```

В директорії webapp вже знаходиться один jsp файл - index.js:

![](../resources/img/jsp/img-5.png)

Модифікуємо вміст index.jsp:

```html
<html>
<body>
<h2>Hello World!</h2>

<form action="form-response.jsp">
	<h2>Enter some name</h2>
	<input name="name" /><br>
	<input type="submit">
</form>

</body>
</html>
```

І створимо новий файл form-response.jsp:

```html
<html>
<body>
<h2>Hello World!</h2>

<p>
<%
String name = request.getParameter("name");

if(name == null)
	out.print("No name parameter was passed");
else
	out.print("Passed name from form is " + name);
%>
</p>

</body>
</html>
```

![](../resources/img/jsp/img-6.png)

![](../resources/img/jsp/img-7.png)

# Створенна власного тега JSP

Для того, щоб мати можливість розробляти власні теги, крім servlet-api, нам знадобиться servlet.jsp-api:

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>ua.com.endlesskwazar</groupId>
	<artifactId>custom.jsp.tag</artifactId>
	<packaging>war</packaging>
	<version>0.0.1-SNAPSHOT</version>
	<name>custom.jsp.tag Maven Webapp</name>
	<url>http://maven.apache.org</url>
	<dependencies>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>3.8.1</version>
			<scope>test</scope>
		</dependency>

		<dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>javax.servlet-api</artifactId>
			<version>4.0.1</version>
			<scope>provided</scope>
		</dependency>

		<dependency>
			<groupId>javax.servlet.jsp</groupId>
			<artifactId>javax.servlet.jsp-api</artifactId>
			<version>2.3.3</version>
			<scope>provided</scope>
		</dependency>
	</dependencies>
	<build>
		<finalName>custom.jsp.tag</finalName>

		<plugins>
			<plugin>
				<groupId>org.eclipse.jetty</groupId>
				<artifactId>jetty-maven-plugin</artifactId>
				<version>9.2.10.v20150310</version>

				<configuration>
					<scanIntervalSeconds>10</scanIntervalSeconds>
					<webApp>
						<contextPath>/custom.jsp.tag</contextPath>
					</webApp>
				</configuration>

			</plugin>
		</plugins>
	</build>
</project>
```

Припустимо, ми хочемо показати номер із форматуванням комами та пробілами. Це може бути дуже корисно для користувача, коли номер дійсно довгий. Отже, ми хочемо, щоб були деякі спеціальні теги:

```html
<mytags:formatNumber number="100050.574" format="#,###.00"/>
```

## Custom Tag Handler

Це перший крок у створенні власних тегів у JSP. Все, що нам потрібно зробити - це розширити клас javax.servlet.jsp.tagext.SimpleTagSupport і перевизначити метод doTag().

Важливо відзначити, що для атрибутів, які потрібні для тегу, ми повинні мати методи сеттера. Отже, ми визначимо два методи встановлення - setFormat (формат String) і setNumber (номер рядка).

SimpleTagSupport надає методи, за допомогою яких ми можемо отримати об'єкт JspWriter і записати дані у відповідь. Ми будемо використовувати клас DecimalFormat для створення форматованого рядка, а потім записати його у відповідь. Остаточна реалізація наведена нижче.

```java
package custom.jsp.tag;

import java.io.IOException;
import java.text.DecimalFormat;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.SkipPageException;
import javax.servlet.jsp.tagext.SimpleTagSupport;

public class NumberFormatterTag extends SimpleTagSupport {
	
	private String format;
	
	private String number;
	
	public NumberFormatterTag() {
		
	}
	
	public void setFormat(String format) {
		this.format = format;
	}

	public void setNumber(String number) {
		this.number = number;
	}
	
	@Override
	public void doTag() throws JspException, IOException {
		System.out.println("Number is:" + number);
		System.out.println("Format is:" + format);
		try {
			double amount = Double.parseDouble(number);
			DecimalFormat formatter = new DecimalFormat(format);
			String formattedNumber = formatter.format(amount);
			getJspContext().getOut().write(formattedNumber);
		} catch (Exception e) {
			e.printStackTrace();
			// зупини завантаження сторінки і кинути SkipPageException
			throw new SkipPageException("Exception in formatting " + number
					+ " with format " + format);
		}
	}

}
```

## JSP Custom Tag Library Descriptor (TLD)

Після того, як клас обробника тегів буде готовий, нам потрібно визначити файл TLD у каталозі WEB-INF, щоб контейнер завантажив його після розгортання програми.

**numberformatter.tld**:
```xml
<?xml version="1.0" encoding="UTF-8" ?>

<taglib xmlns="http://java.sun.com/xml/ns/j2ee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-jsptaglibrary_2_0.xsd"
    version="2.0">
<description>Number Formatter Custom Tag</description>
<tlib-version>2.1</tlib-version>
<short-name>mytags</short-name>
<uri>https://endlesskwazar.com.ua/tlds/my-tags</uri>
<tag>
	<name>formatNumber</name>
	<tag-class>custom.jsp.tag.NumberFormatterTag</tag-class>
	<body-content>empty</body-content>
	<attribute>
	<name>format</name>
	<required>true</required>
	</attribute>
	<attribute>
	<name>number</name>
	<required>true</required>
	</attribute>
</tag>
</taglib>
```

## Custom Tag Deployment Descriptor Configuration

**web.xml**:

```xml
<?xml version="1.0" encoding="UTF-8"?>

<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xmlns="http://java.sun.com/xml/ns/javaee"
  xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
   version="3.0">
  <display-name>Archetype Created Web Application</display-name>
  
  <jsp-config>
  <taglib>
  	<taglib-uri>https://endlesskwazar.com.ua/tlds/my-tags</taglib-uri>
  	<taglib-location>/WEB-INF/numberformatter.tld</taglib-location>
  </taglib>
  </jsp-config>
</web-app>

```


![](../resources/img/jsp/img-3.png)

# Домашнє завдання

Створіть власний JSP - тег, який винконує завдання згідно із варіантом.

## Варіанти

1. іва
2. іва
3. віаві
4. іаві
5. вапрва
6. впва
7. вапва
8. вап 
9. апва

# Контрольні питання

1. Що таке JSP?
2. Як можна вставити код в JSP сторінку?
3. Опишіть процес створення влосного JSP - тега.