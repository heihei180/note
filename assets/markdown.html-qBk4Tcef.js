import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as n,o as e}from"./app-Dn_fbqkr.js";const t={};function l(r,s){return e(),a("div",null,s[0]||(s[0]=[n(`<h1 id="lombok-學習" tabindex="-1"><a class="header-anchor" href="#lombok-學習"><span>Lombok 學習</span></a></h1><h4 id="文章目录" tabindex="-1"><a class="header-anchor" href="#文章目录"><span>文章目录</span></a></h4><ul><li><a href="#_6">前言</a></li><li><a href="#Lombok_14">一、Lombok注解分析</a></li><li><a href="#Annotation_Processing_69">二、编译期的注解处理器Annotation Processing</a></li><li><a href="#Lombok_89">三、Lombok使用方法</a></li><li><a href="#_108">四、自定义注解处理器</a></li><li><ul><li><a href="#1_112">1、自定义注解</a></li><li><a href="#2Processor_126">2、实现Processor接口</a></li><li><a href="#3_170">3、注册注解处理器</a></li></ul></li><li><a href="#MyGetter_234">五、实战MyGetter注解</a></li><li><ul><li><a href="#1MavenmyLombok_240">1、新建Maven工程myLombok</a></li><li><a href="#2myget_269">2、新建子模块myget</a></li><li><a href="#3person_416">3、新建子模块person</a></li><li><a href="#4_435">4、编译并查看结果</a></li></ul></li><li><a href="#_444">总结</a></li></ul><hr><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言"><span>前言</span></a></h2><p>相信做java开发的小伙伴对<a href="https://so.csdn.net/so/search?q=Lombok&amp;spm=1001.2101.3001.7020" target="_blank" rel="noopener noreferrer">Lombok</a>都不陌生，基于Lombok我们可以通过给实体类添加一些简单的注解在不改变原有代码情况下在源代码中嵌入补充信息，比如常见的Get、Set方法。<br> 那么有小伙伴想过其底层实现原理是什么？</p><hr><h2 id="一、lombok注解分析" tabindex="-1"><a class="header-anchor" href="#一、lombok注解分析"><span>一、Lombok注解分析</span></a></h2><p>这里我们以使用最多的@Data为例进行分析。</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-java"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    package</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;"> lombok</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> java.lang.annotation.ElementType</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> java.lang.annotation.Retention</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> java.lang.annotation.RetentionPolicy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> java.lang.annotation.Target</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;">Target</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">({</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">ElementType</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">TYPE</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">})</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;">Retention</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">RetentionPolicy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">SOURCE</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> @</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">interface</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;"> Data</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">        String</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> staticConstructor</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">() </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">default</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>说明：</strong></p><ul><li>元注解<code>@Target({ElementType.TYPE})</code> - 用来说明注解@Data是用在描述类、接口（包括注解类型）或枚举上的</li><li>元注解<code>@Retention(RetentionPolicy.SOURCE)</code> - 用来说明注解@Data在源文件中有效(即源文件保留),编译时期会丢掉，在.class文件中不会保留注解信息。</li></ul><p>我们在程序开发过程中，<a href="https://so.csdn.net/so/search?q=%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B3%A8%E8%A7%A3&amp;spm=1001.2101.3001.7020" target="_blank" rel="noopener noreferrer">自定义注解</a>用的最多的就是<code>@Retention(RetentionPolicy.RUNTIME)</code> 运行期注解，再结合切面、拦截器、反射等机制我们就可以在程序运行过程中根据类上面注解来进行一些逻辑处理。</p><p>而Lombok中的注解都是源文件保留级别的注解，编译成class文件就会丢失对应的注解信息，那么他是通过怎样的机制增强我们的实体类的呢？？？</p><p><strong>补充:</strong><br> 注解信息的三种保留策略：</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-java"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> enum</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> RetentionPolicy</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        /**</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">         * Annotations are to be discarded by the compiler.</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">         * 注解信息被编译器丢弃</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">         */</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">        SOURCE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        /**</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">         * Annotations are to be recorded in the class file by the compiler</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">         * but need not be retained by the VM at run time.  This is the default</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">         * behavior.</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">         * 注解信息会被编译器保留到class文件中，但是JVM运行期间不会保留。默认保留策略</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">         */</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">        CLASS</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        /**</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">         * Annotations are to be recorded in the class file by the compiler and</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">         * retained by the VM at run time, so they may be read reflectively.</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">         * 注解信息会被编译器保留再class文件中，并且在JVM运行期间保留</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">         * </span><span style="--shiki-light:#A626A4;--shiki-light-font-style:italic;--shiki-dark:#C678DD;--shiki-dark-font-style:italic;">@see</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> java.lang.reflect.AnnotatedElement</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">         */</span></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">        RUNTIME</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、编译期的注解处理器annotation-processing" tabindex="-1"><a class="header-anchor" href="#二、编译期的注解处理器annotation-processing"><span>二、编译期的注解处理器Annotation Processing</span></a></h2><p>在 JDK 6 后添加了 JSR 269: <code>Pluggable Annotation Processing API</code> (编译期的注解处理器) ，<br> 通过该处理期我们可以实现在编译期间根据注解信息对生成的class信息进行增强，这也正是Lombok 实现的核心。</p><p>声明一系列的源文件级别的注解，在通过继承 AbstractProcessor 类自定义编译期的注解处理器，重写它的 init() 和 process() 方法，在编译期时把 Lombok 的注解转换为 Java 的常规方法的。</p><p>但同时 Lombok 也存在这一些使用上的缺点，比如：<code>降低了可调试性</code>、可能会有兼容性等问题，因此我们在使用时要根据自己的业务场景和实际情况，来选择要不要使用 Lombok，以及应该如何使用 Lombok。</p><p>接下来，我们进行lombok的原理分析，以Oracle的javac编译工具为例。自Java 6起，javac开始支持JSR 269 Pluggable Annotation Processing API规范，只要程序实现了该API，就能在java源码编译时调用定义的注解。<br> 举例来说，现在有一个实现了&quot;JSR 269 API&quot;的程序A,那么使用javac编译源码的时候具体流程如下：<br> 1、javac对源代码进行分析，生成一棵抽象语法树(AST)；<br> 2、运行过程中调用实现了&quot;JSR 269 API&quot;的A程序；<br> 3、此时A程序就可以完成它自己的逻辑，包括修改第一步骤得到的抽象语法树(AST)；<br> 4、javac使用修改后的抽象语法树(AST)生成字节码文件；</p><p><strong>详细的流程图如下：</strong><br><img src="https://img-blog.csdnimg.cn/bc5afefe570f4ce996eb08cee476a2a2.png" alt="在这里插入图片描述" loading="lazy"><br> 可以看出，在编译期阶段，当 Java 源码被抽象成语法树 (AST) 之后，Lombok 会根据自己的注解处理器动态的修改 AST，增加新的代码 (节点)，在这一切执行之后，再通过分析生成了最终的字节码 (.class) 文件，这就是 Lombok 的执行原理。</p><h2 id="三、lombok使用方法" tabindex="-1"><a class="header-anchor" href="#三、lombok使用方法"><span>三、Lombok使用方法</span></a></h2><p>使用Lombok项目的方法很简单，分为四个步骤：</p><ol><li>安装插件，在编译类路径中加入lombok.jar包（具体安装方法可自己百度）；</li><li>在需要简化的类或方法上，加上要使用的注解；</li><li>使用支持lombok的编译工具编译源代码（关于支持lombok的编译工具，见4.支持lombok的编译工具）；</li><li>编译得到的字节码文件中自动生成Lombok注解对应的方法或代码；</li></ol><p>以我们常见的IDEA开发工具为例，一定要首先在IDEA中安装Lombok插件，该步骤的作用就是添加Lombok注解的编译期注解处理器。<br><img src="https://img-blog.csdnimg.cn/2b9fd647b0384c819c01074d4062c495.png" alt="在这里插入图片描述" loading="lazy"><br> 项目中需要引入lombok的Meven依赖，里面主要包含lombok声明的全部注解信息。</p><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-xml"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">          &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;org.projectlombok&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">groupId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">          &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;lombok&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">artifactId</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">          &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">optional</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;true&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">optional</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">dependency</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、自定义注解处理器" tabindex="-1"><a class="header-anchor" href="#四、自定义注解处理器"><span>四、自定义注解处理器</span></a></h2><p>实现一个自定义注解处理器需要有三个步骤：<br><strong>第一是声明自定义注解，第二是实现Processor接口处理注解，第三是注册注解处理器。</strong></p><h3 id="_1、自定义注解" tabindex="-1"><a class="header-anchor" href="#_1、自定义注解"><span>1、自定义注解</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-java"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> java.lang.annotation.ElementType</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> java.lang.annotation.Retention</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> java.lang.annotation.RetentionPolicy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> java.lang.annotation.Target</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;">Target</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">({</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">ElementType</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">TYPE</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">})</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;">Retention</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">RetentionPolicy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">SOURCE</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> @</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">interface</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;"> CustomAnnotation</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">{</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    </span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、实现processor接口" tabindex="-1"><a class="header-anchor" href="#_2、实现processor接口"><span>2、实现Processor接口</span></a></h3><p>通过实现Processor接口可以自定义注解处理器，这里我们采用更简单的方法通过继承AbstractProcessor类实现自定义注解处理器。实现抽象方法process处理我们想要的功能。</p><p>注解处理器早在JDK1.5的时候就有这个功能了，只不过当时的注解处理器是apt,相关的api是在com.sun.mirror包下的。从JDK1.6开始，apt相关的功能已经包含在了javac中，并提供了新的api在javax.annotation.processing和javax.lang.model to process annotations这两个包中。旧版的注解处理器api在JDK1.7已经被标记为deprecated,并在JDK1.8中移除了apt和相关api。</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-java"><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> CustomProcessor</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> extends</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> AbstractProcessor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        //核心方法：注解处理过程</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;">Override</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> boolean</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> process</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD;">?</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> extends</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> TypeElement</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">annotations</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">RoundEnvironment</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> roundEnvironment</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        //支持的注解类型</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;">Override</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> getSupportedAnnotationTypes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">            Set</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">annotataions</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> LinkedHashSet</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">            annotataions</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">CustomAnnotation</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">getCanonicalName</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">());</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> annotataions;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    </span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        //支持的java版本</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;">Override</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> SourceVersion</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> getSupportedSourceVersion</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            return</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> SourceVersion</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">latestSupported</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以通过注解得方式指定支持的注解类型和JDK版本：</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-java"><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;">SupportedAnnotationTypes</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">({</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;com.laowan.annotation.CustomAnnotation&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">})</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;">SupportedSourceVersion</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">SourceVersion</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">RELEASE_8</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> CustomProcessor</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> extends</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> AbstractProcessor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;">Override</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> boolean</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> process</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Set</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD;">?</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> extends</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> TypeElement</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">annotations</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">RoundEnvironment</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> roundEnvironment</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为兼容的原因，特别是针对Android平台，建议使用重载 getSupportedAnnotationTypes() 和 getSupportedSourceVersion()方法代替 @SupportedAnnotationTypes 和 @SupportedSourceVersion</p><h3 id="_3、注册注解处理器" tabindex="-1"><a class="header-anchor" href="#_3、注册注解处理器"><span>3、注册注解处理器</span></a></h3><p>最后我们还需要将我们自定义的注解处理器进行注册。</p><p><strong>方式一：resources</strong><br> 新建<code>resources</code>文件夹，目录下新建<code>META-INF</code>文件夹，目录下新建services文件夹，目录下新建<code>javax.annotation.processing.Processor</code>文件，然后将我们自定义注解处理器的全类名写到此文件：</p><pre><code>com.laowan.annotation.CustomProcessor
</code></pre><p><strong>注意⚠️：</strong><br> 采用上面的方法注册自定义注解处理器时，一定要将<code>resources</code>文件夹设置为Resources Root，<br> 不然执行编译期间会一只提示找不到<code>javax.annotation.processing.Processor</code>文件中配置的处理器。<br><img src="https://img-blog.csdnimg.cn/4a4fb5c4999a4897acecae35bbe0bc11.png" alt="在这里插入图片描述" loading="lazy"></p><p>示例，lombok中注册注解处理器：<br><img src="https://img-blog.csdnimg.cn/e247af128e9d44bf865bcc6557e0547d.png" alt="在这里插入图片描述" loading="lazy"></p><p><strong>方式二：auto-service</strong><br> 上面这种注册的方式太麻烦了，谷歌帮我们写了一个注解处理器来生成这个文件。<br> github地址：<a href="https://github.com/google/auto" target="_blank" rel="noopener noreferrer">https://github.com/google/auto</a></p><p>添加依赖：</p><pre><code>&lt;!-- https://mvnrepository.com/artifact/com.google.auto.service/auto-service --&gt;
&lt;dependency&gt;
  &lt;groupId&gt;com.google.auto.service&lt;/groupId&gt;
  &lt;artifactId&gt;auto-service&lt;/artifactId&gt;
  &lt;version&gt;1.0.1&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><p>添加注解：</p><pre><code>@AutoService(Processor.class)
public class CustomProcessor extends AbstractProcessor {
    ...
}
</code></pre><p>Lombok中的示例：</p><pre><code>@SupportedAnnotationTypes({&quot;lombok.*&quot;})
public static class ClaimingProcessor extends AbstractProcessor {
    public ClaimingProcessor() {
    }

    public boolean process(Set&lt;? extends TypeElement&gt; annotations, RoundEnvironment roundEnv) {
        return true;
    }

    public SourceVersion getSupportedSourceVersion() {
        return SourceVersion.latest();
    }
}
</code></pre><p>搞定，体会到注解处理器的强大木有。后面我们只需关注注解处理器中的处理逻辑即可。</p><h2 id="五、实战mygetter注解" tabindex="-1"><a class="header-anchor" href="#五、实战mygetter注解"><span>五、实战MyGetter注解</span></a></h2><p>我们实现一个简易版的 Lombok 自定义一个 Getter 方法，我们的实现步骤是：</p><ol><li>自定义一个注解MyGetter ，并实现一个自定义的注解处理器；</li><li>利用 tools.jar 的 javac api 处理 AST (抽象语法树)</li><li>使用自定义的注解处理器编译代码。</li></ol><h3 id="_1、新建maven工程mylombok" tabindex="-1"><a class="header-anchor" href="#_1、新建maven工程mylombok"><span>1、新建Maven工程myLombok</span></a></h3><p>其中包含2个子模块，myget用来存放自定义的注解和注解处理器，person模块用来使用自定义的注解。<br><img src="https://img-blog.csdnimg.cn/48d7f0d1482144c2add3337865244208.png" alt="在这里插入图片描述" loading="lazy"></p><p>myLombok工程的pom.xml文件：</p><pre><code>&lt;project xmlns=&quot;http://maven.apache.org/POM/4.0.0&quot; xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
         xsi:schemaLocation=&quot;http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd&quot;&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;packaging&gt;pom&lt;/packaging&gt;
    &lt;modules&gt;
        &lt;module&gt;myget&lt;/module&gt;
        &lt;module&gt;person&lt;/module&gt;
    &lt;/modules&gt;

    &lt;groupId&gt;com.example&lt;/groupId&gt;
    &lt;artifactId&gt;myLombok&lt;/artifactId&gt;
    &lt;version&gt;0.0.1-SNAPSHOT&lt;/version&gt;
    &lt;name&gt;myLombok&lt;/name&gt;

    &lt;properties&gt;
        &lt;java.version&gt;1.8&lt;/java.version&gt;
    &lt;/properties&gt;
&lt;/project&gt;
</code></pre><p><strong>注意：</strong><br> 这里不要使用spring-boot-maven-plugin的编译器，不然会编译不通过。</p><h3 id="_2、新建子模块myget" tabindex="-1"><a class="header-anchor" href="#_2、新建子模块myget"><span>2、新建子模块myget</span></a></h3><p>1、添加Maven依赖</p><pre><code>    &lt;dependencies&gt;
        &lt;!--Processor中的解析过程需要依赖tools.jar--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;com.sun&lt;/groupId&gt;
            &lt;artifactId&gt;tools&lt;/artifactId&gt;
            &lt;version&gt;1.6.0&lt;/version&gt;
            &lt;scope&gt;system&lt;/scope&gt;
            &lt;systemPath&gt;\${java.home}/../lib/tools.jar&lt;/systemPath&gt;
        &lt;/dependency&gt;

        &lt;!--采用google的auto-service来注入注解处理器--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;com.google.auto.service&lt;/groupId&gt;
            &lt;artifactId&gt;auto-service&lt;/artifactId&gt;
            &lt;version&gt;1.0.1&lt;/version&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;
</code></pre><p>2、首先创建一个 MyGetter.java 自定义注解，代码如下：</p><pre><code>import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.SOURCE) // 注解只在源码中保留
@Target(ElementType.TYPE) // 用于修饰类
public @interface MyGetter { // 定义 Getter

}
</code></pre><p>2、再实现一个自定义的注解处理器MyGetterProcessor，代码如下：</p><pre><code>//这里的导入最好直接拷贝过去
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
@SupportedAnnotationTypes(&quot;com.example.myget.annotation.MyGetter&quot;)
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
    public boolean process(Set&lt;? extends TypeElement&gt; annotations, RoundEnvironment roundEnv) {
        Set&lt;? extends Element&gt; elementsAnnotatedWith = roundEnv.getElementsAnnotatedWith(MyGetter.class);
        elementsAnnotatedWith.forEach(e -&gt; {
            JCTree tree = javacTrees.getTree(e);
            tree.accept(new TreeTranslator() {
                @Override
                public void visitClassDef(JCTree.JCClassDecl jcClassDecl) {
                    List&lt;JCTree.JCVariableDecl&gt; jcVariableDeclList = List.nil();
                    // 在抽象树中找出所有的变量
                    for (JCTree jcTree : jcClassDecl.defs) {
                        if (jcTree.getKind().equals(Tree.Kind.VARIABLE)) {
                            JCTree.JCVariableDecl jcVariableDecl = (JCTree.JCVariableDecl) jcTree;
                            jcVariableDeclList = jcVariableDeclList.append(jcVariableDecl);
                        }
                    }
                    // 对于变量进行生成方法的操作
                    jcVariableDeclList.forEach(jcVariableDecl -&gt; {
                        messager.printMessage(Diagnostic.Kind.NOTE, jcVariableDecl.getName() + &quot; has been processed&quot;);
                        jcClassDecl.defs = jcClassDecl.defs.prepend(makeGetterMethodDecl(jcVariableDecl));
                    });
                    super.visitClassDef(jcClassDecl);
                }
            });
        });
        return true;
    }

    private JCTree.JCMethodDecl makeGetterMethodDecl(JCTree.JCVariableDecl jcVariableDecl) {
        ListBuffer&lt;JCTree.JCStatement&gt; statements = new ListBuffer&lt;&gt;();
        // 生成表达式 例如 this.a = a;
        JCTree.JCExpressionStatement aThis = makeAssignment(treeMaker.Select(treeMaker.Ident(
                names.fromString(&quot;this&quot;)), jcVariableDecl.getName()), treeMaker.Ident(jcVariableDecl.getName()));
        statements.append(aThis);
        JCTree.JCBlock block = treeMaker.Block(0, statements.toList());

        // 生成入参
        JCTree.JCVariableDecl param = treeMaker.VarDef(treeMaker.Modifiers(Flags.PARAMETER),
                jcVariableDecl.getName(), jcVariableDecl.vartype, null);
        List&lt;JCTree.JCVariableDecl&gt; parameters = List.of(param);

        // 生成返回对象
        JCTree.JCExpression methodType = treeMaker.Type(new Type.JCVoidType());
        return treeMaker.MethodDef(treeMaker.Modifiers(Flags.PUBLIC),
                getNewMethodName(jcVariableDecl.getName()), methodType, List.nil(),
                parameters, List.nil(), block, null);

    }

    private Name getNewMethodName(Name name) {
        String s = name.toString();
        return names.fromString(&quot;get&quot; + s.substring(0, 1).toUpperCase() + s.substring(1, name.length()));
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
</code></pre><p>自定义的注解处理器是我们实现简易版的 Lombok 的重中之重，我们需要继承 AbstractProcessor 类，重写它的 init() 和 process() 方法，在 process() 方法中我们先查询所有的变量，在给变量添加对应的方法。我们<code>使用 TreeMaker 对象和 Names 来处理 AST，这一步需要依赖 tool.jar</code>， 如上代码所示。</p><h3 id="_3、新建子模块person" tabindex="-1"><a class="header-anchor" href="#_3、新建子模块person"><span>3、新建子模块person</span></a></h3><p>1、引入maven依赖</p><pre><code>      &lt;dependency&gt;
          &lt;groupId&gt;com.example&lt;/groupId&gt;
          &lt;artifactId&gt;myget&lt;/artifactId&gt;
          &lt;version&gt;0.0.1-SNAPSHOT&lt;/version&gt;
      &lt;/dependency&gt;
</code></pre><p>2、新增Person类，并添加@MyGetter类注解</p><pre><code>@MyGetter
public class Person {
    private String name;
}
</code></pre><h3 id="_4、编译并查看结果" tabindex="-1"><a class="header-anchor" href="#_4、编译并查看结果"><span>4、编译并查看结果</span></a></h3><p>1、执行编译打包<br><img src="https://img-blog.csdnimg.cn/08da5656aa8b4f8b8db15804246686ce.png" alt="在这里插入图片描述" loading="lazy"></p><p>2、检查Person类的编译结果，自动生成了get方法，说明自定义的注解@MyGetter生效<br><img src="https://img-blog.csdnimg.cn/d16e2af0f4d6449b8d722fff30a1d753.png" alt="在这里插入图片描述" loading="lazy"></p><hr><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>本文主要对Lombok的实现原理进行了介绍，并通过自定义注解@MyGetter演示了编译期注解处理器的使用过程。<br> 1、通过元注解@<a href="https://so.csdn.net/so/search?q=Retention&amp;spm=1001.2101.3001.7020" target="_blank" rel="noopener noreferrer">Retention</a>可以配置注解信息的保留策略RetentionPolicy：</p><ul><li><code>SOURCE</code> 源文件保留策略，编译过程会丢弃注解信息</li><li><code>CLASS</code> class文件保留策略，注解信息会被编译器保留到class文件中，但是JVM运行期间不会保留。默认保留策略</li><li><code>RUNTIME</code> 运行期保留策略，注解信息会被编译器保留再class文件中，并且在JVM运行期间保留</li></ul><p>2、Lombok中的注解都是SOURCE源文件保留策略的注解，其实现原理是借助JDK 6 后添加的 JSR 269: <code>Pluggable Annotation Processing API</code> (编译期的注解处理器) ，通过该处理期实现在编译期间根据注解信息对生成的class信息进行增强。</p><p>3、自定义的编译期注解器的2种注册方式：resources方式和auto-service方式。</p>`,82)]))}const o=i(t,[["render",l]]),k=JSON.parse('{"path":"/Java/%E6%8A%80%E6%9C%AF%E5%88%86%E6%9E%90/markdown.html","title":"Lombok學習研究","lang":"zh-CN","frontmatter":{"home":false,"portfolio":false,"title":"Lombok學習研究","icon":"house","titles":["注解处理器","Lombok","Java"],"footer":false,"description":"Lombok 學習 文章目录 前言 一、Lombok注解分析 二、编译期的注解处理器Annotation Processing 三、Lombok使用方法 四、自定义注解处理器 1、自定义注解 2、实现Processor接口 3、注册注解处理器 五、实战MyGetter注解 1、新建Maven工程myLombok 2、新建子模块myget 3、新建子模块...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Lombok學習研究\\",\\"image\\":[\\"https://img-blog.csdnimg.cn/bc5afefe570f4ce996eb08cee476a2a2.png\\",\\"https://img-blog.csdnimg.cn/2b9fd647b0384c819c01074d4062c495.png\\",\\"https://img-blog.csdnimg.cn/4a4fb5c4999a4897acecae35bbe0bc11.png\\",\\"https://img-blog.csdnimg.cn/e247af128e9d44bf865bcc6557e0547d.png\\",\\"https://img-blog.csdnimg.cn/48d7f0d1482144c2add3337865244208.png\\",\\"https://img-blog.csdnimg.cn/08da5656aa8b4f8b8db15804246686ce.png\\",\\"https://img-blog.csdnimg.cn/d16e2af0f4d6449b8d722fff30a1d753.png\\"],\\"dateModified\\":\\"2025-08-04T07:01:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"heihei180\\",\\"url\\":\\"https://github.com/heihei180\\"}]}"],["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/note/Java/%E6%8A%80%E6%9C%AF%E5%88%86%E6%9E%90/markdown.html"}],["meta",{"property":"og:site_name","content":"筆記本首頁"}],["meta",{"property":"og:title","content":"Lombok學習研究"}],["meta",{"property":"og:description","content":"Lombok 學習 文章目录 前言 一、Lombok注解分析 二、编译期的注解处理器Annotation Processing 三、Lombok使用方法 四、自定义注解处理器 1、自定义注解 2、实现Processor接口 3、注册注解处理器 五、实战MyGetter注解 1、新建Maven工程myLombok 2、新建子模块myget 3、新建子模块..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://img-blog.csdnimg.cn/bc5afefe570f4ce996eb08cee476a2a2.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-08-04T07:01:30.000Z"}],["meta",{"property":"article:modified_time","content":"2025-08-04T07:01:30.000Z"}]]},"git":{"createdTime":1754290890000,"updatedTime":1754290890000,"contributors":[{"name":"wanggq10","username":"wanggq10","email":"wanggq10@lenovo.com","commits":1,"url":"https://github.com/wanggq10"}]},"readingTime":{"minutes":11.1,"words":3329},"filePathRelative":"Java/技术分析/markdown.md","autoDesc":true}');export{o as comp,k as data};
