**声明：以下接口仅限于学习使用，严禁用于商业用途**
## Start
> git clone https://github.com/liaoqinwei/qqMusicApi.git
>
> npm install 
>
> npm run start


#### 主页数据(推荐)

> + recommend：获取主页的  推荐数据 和 排行榜数据 (移动端)
>   + type json
> + tolist：获取主页的  排行榜数据 
>   + type json
> + precommend：获取主页推荐数据(Pc端)
>   + type json

#### 专辑

> + newAlbum：最新专辑
>   + type json
> + albumDetail?id: 专辑详情  
>   + id为专辑的id
>   + type json

#### 排行榜

> + raking：排行榜
>   + type json
> + rakingDetail?id: 排行榜详情  
>   +  id：排行榜的topid
>   + type json

#### 搜索

> + hotSearch: 热搜
> + search?w=&p=1&n=20&： 搜索   
>   + w：搜索的关键字(必传)
>   + p：页码 默认1  
>   + n：每页多少条 默认20
>   + type json

#### 歌单

> + songList?id：返回歌单详情  
>   + id为歌单的listid
>   + type json

#### 单曲&歌词

> + song?id：歌曲文件	
>   + id：歌曲的songmid    	
>   + type m4a
> + lyric?id：歌词信息
>   + id: 歌曲的songmid
>   + type json
> + songDesc?id： 获取歌曲详情信息
>   + id: 歌曲的albumMid 
>   + type json
> + songDetail?id：获取歌曲的描述信息
>   + id：歌曲的songid
>   + type json   
#### 评论
> + comment?id&page：获取评论
>  + id：歌曲的id
>  + page：查看评论的页数 默认0
>  + type json