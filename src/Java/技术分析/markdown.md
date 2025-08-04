---
home: false
portfolio: false
title: Lombok學習研究
icon: house

titles:
  - 注解处理器
  - Lombok
  - Java
footer: false
---

# Lombok 學習

#### 文章目录

*   [前言](#_6)
*   [一、Lombok注解分析](#Lombok_14)
*   [二、编译期的注解处理器Annotation Processing](#Annotation_Processing_69)
*   [三、Lombok使用方法](#Lombok_89)
*   [四、自定义注解处理器](#_108)
*   *   [1、自定义注解](#1_112)
    *   [2、实现Processor接口](#2Processor_126)
    *   [3、注册注解处理器](#3_170)
*   [五、实战MyGetter注解](#MyGetter_234)
*   *   [1、新建Maven工程myLombok](#1MavenmyLombok_240)
    *   [2、新建子模块myget](#2myget_269)
    *   [3、新建子模块person](#3person_416)
    *   [4、编译并查看结果](#4_435)
*   [总结](#_444)

* * *

前言
--

相信做java开发的小伙伴对[Lombok](https://so.csdn.net/so/search?q=Lombok&spm=1001.2101.3001.7020)都不陌生，基于Lombok我们可以通过给实体类添加一些简单的注解在不改变原有代码情况下在源代码中嵌入补充信息，比如常见的Get、Set方法。  
那么有小伙伴想过其底层实现原理是什么？

* * *

一、Lombok注解分析
------------

这里我们以使用最多的@Data为例进行分析。

```Java
    package lombok;
    
    import java.lang.annotation.ElementType;
    import java.lang.annotation.Retention;
    import java.lang.annotation.RetentionPolicy;
    import java.lang.annotation.Target;
    
    @Target({ElementType.TYPE})
    @Retention(RetentionPolicy.SOURCE)
    public @interface Data {
        String staticConstructor() default "";
    }
```
    

**说明：**

*   元注解`@Target({ElementType.TYPE})` \- 用来说明注解@Data是用在描述类、接口（包括注解类型）或枚举上的
*   元注解`@Retention(RetentionPolicy.SOURCE)` \- 用来说明注解@Data在源文件中有效(即源文件保留),编译时期会丢掉，在.class文件中不会保留注解信息。

我们在程序开发过程中，[自定义注解](https://so.csdn.net/so/search?q=%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B3%A8%E8%A7%A3&spm=1001.2101.3001.7020)用的最多的就是`@Retention(RetentionPolicy.RUNTIME)` 运行期注解，再结合切面、拦截器、反射等机制我们就可以在程序运行过程中根据类上面注解来进行一些逻辑处理。

而Lombok中的注解都是源文件保留级别的注解，编译成class文件就会丢失对应的注解信息，那么他是通过怎样的机制增强我们的实体类的呢？？？

**补充:**  
注解信息的三种保留策略：
```Java
    public enum RetentionPolicy {
        /**
         * Annotations are to be discarded by the compiler.
         * 注解信息被编译器丢弃
         */
        SOURCE,
    
        /**
         * Annotations are to be recorded in the class file by the compiler
         * but need not be retained by the VM at run time.  This is the default
         * behavior.
         * 注解信息会被编译器保留到class文件中，但是JVM运行期间不会保留。默认保留策略
         */
        CLASS,
    
        /**
         * Annotations are to be recorded in the class file by the compiler and
         * retained by the VM at run time, so they may be read reflectively.
         * 注解信息会被编译器保留再class文件中，并且在JVM运行期间保留
         * @see java.lang.reflect.AnnotatedElement
         */
        RUNTIME
    }
```   

二、编译期的注解处理器Annotation Processing
--------------------------------

在 JDK 6 后添加了 JSR 269: `Pluggable Annotation Processing API` (编译期的注解处理器) ，  
通过该处理期我们可以实现在编译期间根据注解信息对生成的class信息进行增强，这也正是Lombok 实现的核心。

声明一系列的源文件级别的注解，在通过继承 AbstractProcessor 类自定义编译期的注解处理器，重写它的 init() 和 process() 方法，在编译期时把 Lombok 的注解转换为 Java 的常规方法的。

但同时 Lombok 也存在这一些使用上的缺点，比如：`降低了可调试性`、可能会有兼容性等问题，因此我们在使用时要根据自己的业务场景和实际情况，来选择要不要使用 Lombok，以及应该如何使用 Lombok。

接下来，我们进行lombok的原理分析，以Oracle的javac编译工具为例。自Java 6起，javac开始支持JSR 269 Pluggable Annotation Processing API规范，只要程序实现了该API，就能在java源码编译时调用定义的注解。  
举例来说，现在有一个实现了"JSR 269 API"的程序A,那么使用javac编译源码的时候具体流程如下：  
1、javac对源代码进行分析，生成一棵抽象语法树(AST)；  
2、运行过程中调用实现了"JSR 269 API"的A程序；  
3、此时A程序就可以完成它自己的逻辑，包括修改第一步骤得到的抽象语法树(AST)；  
4、javac使用修改后的抽象语法树(AST)生成字节码文件；

**详细的流程图如下：**  
![在这里插入图片描述](https://img-blog.csdnimg.cn/bc5afefe570f4ce996eb08cee476a2a2.png)  
可以看出，在编译期阶段，当 Java 源码被抽象成语法树 (AST) 之后，Lombok 会根据自己的注解处理器动态的修改 AST，增加新的代码 (节点)，在这一切执行之后，再通过分析生成了最终的字节码 (.class) 文件，这就是 Lombok 的执行原理。

三、Lombok使用方法
------------

使用Lombok项目的方法很简单，分为四个步骤：

1.  安装插件，在编译类路径中加入lombok.jar包（具体安装方法可自己百度）；
2.  在需要简化的类或方法上，加上要使用的注解；
3.  使用支持lombok的编译工具编译源代码（关于支持lombok的编译工具，见4.支持lombok的编译工具）；
4.  编译得到的字节码文件中自动生成Lombok注解对应的方法或代码；

以我们常见的IDEA开发工具为例，一定要首先在IDEA中安装Lombok插件，该步骤的作用就是添加Lombok注解的编译期注解处理器。  
![在这里插入图片描述](https://img-blog.csdnimg.cn/2b9fd647b0384c819c01074d4062c495.png)  
项目中需要引入lombok的Meven依赖，里面主要包含lombok声明的全部注解信息。

```xml
      <dependency>
          <groupId>org.projectlombok</groupId>
          <artifactId>lombok</artifactId>
          <optional>true</optional>
      </dependency>
```

四、自定义注解处理器
----------

实现一个自定义注解处理器需要有三个步骤：  
**第一是声明自定义注解，第二是实现Processor接口处理注解，第三是注册注解处理器。**

### 1、自定义注解

```Java
    import java.lang.annotation.ElementType;
    import java.lang.annotation.Retention;
    import java.lang.annotation.RetentionPolicy;
    import java.lang.annotation.Target;
    
    @Target({ElementType.TYPE})
    @Retention(RetentionPolicy.SOURCE)
    public @interface CustomAnnotation{
    
    }
```

### 2、实现Processor接口

通过实现Processor接口可以自定义注解处理器，这里我们采用更简单的方法通过继承AbstractProcessor类实现自定义注解处理器。实现抽象方法process处理我们想要的功能。

注解处理器早在JDK1.5的时候就有这个功能了，只不过当时的注解处理器是apt,相关的api是在com.sun.mirror包下的。从JDK1.6开始，apt相关的功能已经包含在了javac中，并提供了新的api在javax.annotation.processing和javax.lang.model to process annotations这两个包中。旧版的注解处理器api在JDK1.7已经被标记为deprecated,并在JDK1.8中移除了apt和相关api。

```Java
    public class CustomProcessor extends AbstractProcessor {
        //核心方法：注解处理过程
        @Override
        public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnvironment) {
            return false;
        }
    
        //支持的注解类型
        @Override
        public Set<String> getSupportedAnnotationTypes() {
            Set<String> annotataions = new LinkedHashSet<String>();
            annotataions.add(CustomAnnotation.class.getCanonicalName());
            return annotataions;
        }
    
        //支持的java版本
        @Override
        public SourceVersion getSupportedSourceVersion() {
            return SourceVersion.latestSupported();
        }
    }
```  
    

也可以通过注解得方式指定支持的注解类型和JDK版本：

```Java
    @SupportedAnnotationTypes({"com.laowan.annotation.CustomAnnotation"})
    @SupportedSourceVersion(SourceVersion.RELEASE_8)
    public class CustomProcessor extends AbstractProcessor {
        @Override
        public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnvironment) {
            return false;
        }
    }
```   

因为兼容的原因，特别是针对Android平台，建议使用重载 getSupportedAnnotationTypes() 和 getSupportedSourceVersion()方法代替 @SupportedAnnotationTypes 和 @SupportedSourceVersion

### 3、注册注解处理器

最后我们还需要将我们自定义的注解处理器进行注册。

**方式一：resources**  
新建`resources`文件夹，目录下新建`META-INF`文件夹，目录下新建services文件夹，目录下新建`javax.annotation.processing.Processor`文件，然后将我们自定义注解处理器的全类名写到此文件：

    com.laowan.annotation.CustomProcessor
    

**注意⚠️：**  
采用上面的方法注册自定义注解处理器时，一定要将`resources`文件夹设置为Resources Root，  
不然执行编译期间会一只提示找不到`javax.annotation.processing.Processor`文件中配置的处理器。  
![在这里插入图片描述](https://img-blog.csdnimg.cn/4a4fb5c4999a4897acecae35bbe0bc11.png)

示例，lombok中注册注解处理器：  
![在这里插入图片描述](https://img-blog.csdnimg.cn/e247af128e9d44bf865bcc6557e0547d.png)

**方式二：auto-service**  
上面这种注册的方式太麻烦了，谷歌帮我们写了一个注解处理器来生成这个文件。  
github地址：[https://github.com/google/auto](https://github.com/google/auto)

添加依赖：

    <!-- https://mvnrepository.com/artifact/com.google.auto.service/auto-service -->
    <dependency>
      <groupId>com.google.auto.service</groupId>
      <artifactId>auto-service</artifactId>
      <version>1.0.1</version>
    </dependency>
    

添加注解：

    @AutoService(Processor.class)
    public class CustomProcessor extends AbstractProcessor {
        ...
    }
    

Lombok中的示例：

    @SupportedAnnotationTypes({"lombok.*"})
    public static class ClaimingProcessor extends AbstractProcessor {
        public ClaimingProcessor() {
        }
    
        public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
            return true;
        }
    
        public SourceVersion getSupportedSourceVersion() {
            return SourceVersion.latest();
        }
    }
    

搞定，体会到注解处理器的强大木有。后面我们只需关注注解处理器中的处理逻辑即可。

五、实战MyGetter注解
--------------

我们实现一个简易版的 Lombok 自定义一个 Getter 方法，我们的实现步骤是：

1.  自定义一个注解MyGetter ，并实现一个自定义的注解处理器；
2.  利用 tools.jar 的 javac api 处理 AST (抽象语法树)
3.  使用自定义的注解处理器编译代码。

### 1、新建Maven工程myLombok

其中包含2个子模块，myget用来存放自定义的注解和注解处理器，person模块用来使用自定义的注解。  
![在这里插入图片描述](https://img-blog.csdnimg.cn/48d7f0d1482144c2add3337865244208.png)

myLombok工程的pom.xml文件：

    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <packaging>pom</packaging>
        <modules>
            <module>myget</module>
            <module>person</module>
        </modules>
    
        <groupId>com.example</groupId>
        <artifactId>myLombok</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <name>myLombok</name>
    
        <properties>
            <java.version>1.8</java.version>
        </properties>
    </project>
    

**注意：**  
这里不要使用spring-boot-maven-plugin的编译器，不然会编译不通过。

### 2、新建子模块myget

1、添加Maven依赖

        <dependencies>
            <!--Processor中的解析过程需要依赖tools.jar-->
            <dependency>
                <groupId>com.sun</groupId>
                <artifactId>tools</artifactId>
                <version>1.6.0</version>
                <scope>system</scope>
                <systemPath>${java.home}/../lib/tools.jar</systemPath>
            </dependency>
    
            <!--采用google的auto-service来注入注解处理器-->
            <dependency>
                <groupId>com.google.auto.service</groupId>
                <artifactId>auto-service</artifactId>
                <version>1.0.1</version>
            </dependency>
        </dependencies>
    

2、首先创建一个 MyGetter.java 自定义注解，代码如下：

    import java.lang.annotation.ElementType;
    import java.lang.annotation.Retention;
    import java.lang.annotation.RetentionPolicy;
    import java.lang.annotation.Target;
    
    @Retention(RetentionPolicy.SOURCE) // 注解只在源码中保留
    @Target(ElementType.TYPE) // 用于修饰类
    public @interface MyGetter { // 定义 Getter
    
    }
    

2、再实现一个自定义的注解处理器MyGetterProcessor，代码如下：

    //这里的导入最好直接拷贝过去
    import com.sun.source.tree.Tree;
    import com.sun.tools.javac.api.JavacTrees;
    import com.sun.tools.javac.code.Flags;
    import com.sun.tools.javac.code.Type;
    import com.sun.tools.javac.processing.JavacProcessingEnvironment;
    import com.sun.tools.javac.tree.JCTree;
    import com.sun.tools.javac.tree.TreeMaker;
    import com.sun.tools.javac.tree.TreeTranslator;
    import com.sun.tools.javac.util.*;
    
    import javax.annotation.processing.*;
    import javax.lang.model.SourceVersion;
    import javax.lang.model.element.Element;
    import javax.lang.model.element.TypeElement;
    import javax.tools.Diagnostic;
    import java.util.Set;
    
    @AutoService(Processor.class) //自动注入注解处理器
    @SupportedSourceVersion(SourceVersion.RELEASE_8)
    @SupportedAnnotationTypes("com.example.myget.annotation.MyGetter")
    public class MyGetterProcessor extends AbstractProcessor {
    
        private Messager messager; // 编译时期输入日志的
        private JavacTrees javacTrees; // 提供了待处理的抽象语法树
        private TreeMaker treeMaker; // 封装了创建AST节点的一些方法
        private Names names; // 提供了创建标识符的方法
    
        @Override
        public synchronized void init(ProcessingEnvironment processingEnv) {
            super.init(processingEnv);
            this.messager = processingEnv.getMessager();
            this.javacTrees = JavacTrees.instance(processingEnv);
            Context context = ((JavacProcessingEnvironment) processingEnv).getContext();
            this.treeMaker = TreeMaker.instance(context);
            this.names = Names.instance(context);
        }
    
        @Override
        public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
            Set<? extends Element> elementsAnnotatedWith = roundEnv.getElementsAnnotatedWith(MyGetter.class);
            elementsAnnotatedWith.forEach(e -> {
                JCTree tree = javacTrees.getTree(e);
                tree.accept(new TreeTranslator() {
                    @Override
                    public void visitClassDef(JCTree.JCClassDecl jcClassDecl) {
                        List<JCTree.JCVariableDecl> jcVariableDeclList = List.nil();
                        // 在抽象树中找出所有的变量
                        for (JCTree jcTree : jcClassDecl.defs) {
                            if (jcTree.getKind().equals(Tree.Kind.VARIABLE)) {
                                JCTree.JCVariableDecl jcVariableDecl = (JCTree.JCVariableDecl) jcTree;
                                jcVariableDeclList = jcVariableDeclList.append(jcVariableDecl);
                            }
                        }
                        // 对于变量进行生成方法的操作
                        jcVariableDeclList.forEach(jcVariableDecl -> {
                            messager.printMessage(Diagnostic.Kind.NOTE, jcVariableDecl.getName() + " has been processed");
                            jcClassDecl.defs = jcClassDecl.defs.prepend(makeGetterMethodDecl(jcVariableDecl));
                        });
                        super.visitClassDef(jcClassDecl);
                    }
                });
            });
            return true;
        }
    
        private JCTree.JCMethodDecl makeGetterMethodDecl(JCTree.JCVariableDecl jcVariableDecl) {
            ListBuffer<JCTree.JCStatement> statements = new ListBuffer<>();
            // 生成表达式 例如 this.a = a;
            JCTree.JCExpressionStatement aThis = makeAssignment(treeMaker.Select(treeMaker.Ident(
                    names.fromString("this")), jcVariableDecl.getName()), treeMaker.Ident(jcVariableDecl.getName()));
            statements.append(aThis);
            JCTree.JCBlock block = treeMaker.Block(0, statements.toList());
    
            // 生成入参
            JCTree.JCVariableDecl param = treeMaker.VarDef(treeMaker.Modifiers(Flags.PARAMETER),
                    jcVariableDecl.getName(), jcVariableDecl.vartype, null);
            List<JCTree.JCVariableDecl> parameters = List.of(param);
    
            // 生成返回对象
            JCTree.JCExpression methodType = treeMaker.Type(new Type.JCVoidType());
            return treeMaker.MethodDef(treeMaker.Modifiers(Flags.PUBLIC),
                    getNewMethodName(jcVariableDecl.getName()), methodType, List.nil(),
                    parameters, List.nil(), block, null);
    
        }
    
        private Name getNewMethodName(Name name) {
            String s = name.toString();
            return names.fromString("get" + s.substring(0, 1).toUpperCase() + s.substring(1, name.length()));
        }
    
        private JCTree.JCExpressionStatement makeAssignment(JCTree.JCExpression lhs, JCTree.JCExpression rhs) {
            return treeMaker.Exec(
                    treeMaker.Assign(
                            lhs,
                            rhs
                    )
            );
        }
    }
    

自定义的注解处理器是我们实现简易版的 Lombok 的重中之重，我们需要继承 AbstractProcessor 类，重写它的 init() 和 process() 方法，在 process() 方法中我们先查询所有的变量，在给变量添加对应的方法。我们`使用 TreeMaker 对象和 Names 来处理 AST，这一步需要依赖 tool.jar`， 如上代码所示。

### 3、新建子模块person

1、引入maven依赖

          <dependency>
              <groupId>com.example</groupId>
              <artifactId>myget</artifactId>
              <version>0.0.1-SNAPSHOT</version>
          </dependency>
    

2、新增Person类，并添加@MyGetter类注解

    @MyGetter
    public class Person {
        private String name;
    }
    

### 4、编译并查看结果

1、执行编译打包  
![在这里插入图片描述](https://img-blog.csdnimg.cn/08da5656aa8b4f8b8db15804246686ce.png)

2、检查Person类的编译结果，自动生成了get方法，说明自定义的注解@MyGetter生效  
![在这里插入图片描述](https://img-blog.csdnimg.cn/d16e2af0f4d6449b8d722fff30a1d753.png)

* * *

总结
--

本文主要对Lombok的实现原理进行了介绍，并通过自定义注解@MyGetter演示了编译期注解处理器的使用过程。  
1、通过元注解@[Retention](https://so.csdn.net/so/search?q=Retention&spm=1001.2101.3001.7020)可以配置注解信息的保留策略RetentionPolicy：

*   `SOURCE` 源文件保留策略，编译过程会丢弃注解信息
*   `CLASS` class文件保留策略，注解信息会被编译器保留到class文件中，但是JVM运行期间不会保留。默认保留策略
*   `RUNTIME` 运行期保留策略，注解信息会被编译器保留再class文件中，并且在JVM运行期间保留

2、Lombok中的注解都是SOURCE源文件保留策略的注解，其实现原理是借助JDK 6 后添加的 JSR 269: `Pluggable Annotation Processing API` (编译期的注解处理器) ，通过该处理期实现在编译期间根据注解信息对生成的class信息进行增强。

3、自定义的编译期注解器的2种注册方式：resources方式和auto-service方式。