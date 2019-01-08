<template>
  <footer class="footer">
    <div class="container">
      <div class="row footer-top">
        <div class="col-sm-5 col-lg-5">
          <p class="padding-top-xsm">{{ description }}</p>

          <div class="text-md">
            <a v-for="item in contacts"  v-title="item.title" :href="item.link" :style="contactStyle" target="_blank">
              <i :class="`fa fa-${item.icon}`"></i>
            </a>
          </div>

          <br>

          <span v-html="designer"></span>
        </div>

        <div class="col-sm-6 col-lg-6 col-lg-offset-1">
          <div class="row">
            <div class="col-sm-4">
              <h4>{{ sponsor.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="item in sponsor.list">
                  <a :href="item.link" target="_blank">
                    <img v-title="item.title" :src="item.logo" :alt="item.title" class="footer-sponsor-link" width="98">
                  </a>
                </li>
              </ul>
            </div>

            <div class="col-sm-4">
              <h4>{{ statistics.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="item in statistics.list">{{ item.title }}: {{ item.description }}</li>
              </ul>
            </div>

            <div class="col-sm-4">
              <h4>{{ other.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="item in other.list">
                  <a :href="item.link" :title="item.title" target="_blank">
                    <i :class="`fa fa-${item.icon}`"></i> {{ item.title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
// 引入 title.js 的默认值
import title from '@/directives/title'

export default {
  name: 'TheFooter',
  // 添加 directives 选项，并注册 title
  directives: {
    title
  },
  data() {
    return {
      description: '码鱼（CoderEdu）社区，交流问题，共同学习，分享知识，传递正能量。有些原本不该丢的东西丢在了大海里，我们像鱼儿一样在大海中寻找',
      contacts: [
        {
          icon: 'envelope',
          title: '反馈问题',
          link: 'mailto:1348647935@qq.com'
        },
        {
          icon: 'weibo',
          title: '站长微博',
          link: 'https://weibo.com/'
        },
        {
          icon: 'weixin',
          title: '加我微信',
          link: 'https://weixin.com'
        }
      ],
      contactStyle: {
        paddingRight: '8px'
      },
      designer: `
        <span style="font-size:0.9em">技术支持
          
          <a href=""target="_blank"style="color:inherit">xingxing</a>
        </span>
      `,
      sponsor: {
        title: '赞助商',
        list: [
          {
            logo: 'http://www.coderedu.com/images/mengdou.png',
            title: '梦豆网',
            link: ''
          },
          {
            logo: 'http://www.coderedu.com/images/xinmeiquan.png',
            title: '新媒圈',
            link: ''
          }
          // ,
          // {
          //   logo: 'https://lccdn.phphub.org/uploads/banners/XPtLlZmIN1cQbLuDFEON.png',
          //   title: 'Composer 镜像赞助商',
          //   link: 'https://www.upyun.com/'
          // },
          // {
          //   logo: 'https://lccdn.phphub.org/uploads/banners/JpTCK6OKYBIrBIWdtob8.png',
          //   title: '订阅邮件赞助商：SendCloud',
          //   link: 'http://www.sendcloud.net/'
          // }
        ]
      },
      statistics: {
        title: '统计信息',
        list: [
          {
            title: '社区会员',
            description: '22889'
          },
          {
            title: '话题数',
            description: '7397'
          },
          {
            title: '评论数',
            description: '39375'
          }
        ]
      },
      other: {
        title: '其他信息',
        list: [
          {
            icon: 'thumbs-up',
            title: '学习知识',
            link: ''
          },
          {
            icon: 'globe',
            title: '推荐网站',
            link: ''
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
a:hover, a:focus { color: #e27575; transition: color .15s;}
</style>