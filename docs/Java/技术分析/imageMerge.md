# 图片合并

```java

    public static void main(String[] args) throws IOException {
        // 头像
        BufferedImage baseImage = ImageIO.read(new File("C:\\Users\\guoqiang\\Downloads\\微信图片_20240925124427.jpg"));
        // 背景图 png 透明格式的最好，不影响原图的基本观感
        BufferedImage overlayImage = ImageIO.read(new File("C:\\Users\\guoqiang\\Downloads\\76.png"));

        // 调整覆盖图片大小
        Image scaledOverlay = overlayImage.getScaledInstance(baseImage.getWidth(), baseImage.getHeight(), Image.SCALE_SMOOTH);

        Graphics2D g = baseImage.createGraphics();
        g.drawImage(scaledOverlay , 0, 0, null); // 调整位置和大小
        g.dispose();

        // 输出合成后的图片
        ImageIO.write(baseImage, "PNG", new File("mergedImage4.png"));
    }
```
> 使用微信头像作为后缀
> 使用带有头像框的图片作为边框。
> 将两张图片合并成一张图片


* 国庆头像
* 春节头像
....