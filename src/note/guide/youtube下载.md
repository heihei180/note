# YouTube 视频下载

python代码：

```python
import base64
import json
import re
from urllib.parse import quote

import requests


def get_download_page_id(target) -> str:
    """
    使用https://www.youtubemp3dl.com/extracting做youtube的解析、
    首先，使用这个函数获取解析页面的id

    :param target:  待解析的youtube播放页面url
    :return:  返回 解析页面的id号、 比如906
    通过id号拼接：https://www.youtubemp3dl.com/youtube/906.html 这个页面就有 youtube的视频音频下载地址
    """
    base_uri = "https://www.youtubemp3dl.com/extracting"
    # payload = "link=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DDzTkhsnjmLs%26ab_channel%3DCircusVideo"
    payload = "link=" + target
    headers = {
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'origin': 'https://www.youtubemp3dl.com',
        'pragma': 'no-cache',
        'priority': 'u=1, i',
        'referer': 'https://www.youtubemp3dl.com/',
        'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest'
    }

    response = requests.request("POST", base_uri, headers=headers, data=payload)

    ret = response.text
    print(ret)
    return ret


def get_download_page(id):
    """
    https://www.youtubemp3dl.com/youtube/906.html
    :param id: 页面id
    :return:
    """
    page_url = "https://www.youtubemp3dl.com/youtube/" + str(id) + ".html"
    return requests.get(page_url).text


def parse_download_page(page_html) -> dict[str, str]:
    """
    var mp3_dl_url = atob("L3lvdXR1YmUvZGw/aWQ9OTA2JmZvcm1hdD1tcDM=");
    var wav_dl_url = atob("L3lvdXR1YmUvZGw/aWQ9OTA2JmZvcm1hdD13YXY=");
    var mp4_dl_url = atob("L3lvdXR1YmUvZGxfbXA0P2lkPTkwNg==");

    下载地址如上，
    1. 进行base64解码，获取到原内容
    :param page_html:
    :return:
    """
    # 使用正则表达式匹配Base64编码的字符串
    # 注意：这个正则表达式假设Base64字符串在双引号内，并且前面有'atob('
    base64_pattern = r'atob\("([^"]+)"\)'
    matches = re.findall(base64_pattern, page_html)
    url_map = {
        "mp3": base64.b64decode(matches[0]).decode('utf-8'),
        "wav": base64.b64decode(matches[1]).decode('utf-8'),
        "mp4": base64.b64decode(matches[2]).decode('utf-8')
    }

    print(f'mp3下载地址：https://www.youtubemp3dl.com{url_map["mp3"]}')
    print(f'wav下载地址：https://www.youtubemp3dl.com{url_map["wav"]}')
    print(f'mp4下载地址：https://www.youtubemp3dl.com{url_map["mp4"]}')
    return url_map


if __name__ == '__main__':
    target = "https://www.youtube.com/watch?v=DzTkhsnjmLs&ab_channel=CircusVideo"
    target = quote(target)
    page_json = get_download_page_id(target)
    json_obj = json.loads(page_json)
    pid = json_obj['id']
    page_html = get_download_page(pid)
    # parse_download_page(page_html)
    print(f'mp3: https://www.youtubemp3dl.com/youtube/youtube_dl?id={pid}&format=mp3')
    print(f'wav: https://www.youtubemp3dl.com/youtube/youtube_dl?id={pid}&format=wav')
    print(f'mp4: https://www.youtubemp3dl.com/youtube/youtube_dl?id={pid}&format=mp4')
    #     原始视频
    pattern = 'href="(.*?)">Muted Video Download'
    value = re.findall(pattern, page_html)
    print(f'原始视频下载地址：{value[0] if len(value) > 0 else "未找到"}')

```