const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const { default: Axios } = require("axios");

// 邮件配置及发送
function sendMail(text, title = "hello、miss_李") {
  const user = "18720706348@163.com"; // 自己的邮箱
  const pass = "XBASUEDLZDOAPNJC"; // 邮箱授权码
  // const to = "liminmin950714@gmail.com"; // 对方的邮箱
  const to = "1454556135@qq.com"; // 对方的邮箱
  const transporter = nodemailer.createTransport({
    service: '163',
    host: "smtp.163.com",
    port: 994,
    secure: true,
    auth: {
      user: user, // 用户账号
      pass: pass, //授权码
    },
  });
  console.log('即将发出');
  transporter.sendMail({
    from: user,
    to: to,
    subject: title,
    text: text,
  }).then(res => {
    console.log('发送成功:', res);
  }).catch(err => {
    console.log('发送失败:', err);
  });
}

// 获取情话
function getLoverPrattle() {
  return Axios.get('https://chp.shadiao.app/api.php')
}

// 爱心花射
function loveToSend() {
  getLoverPrattle().then(res => {
    console.log('see what are u say: ', res.data);
    sendMail(res.data)
  })
}

// 定时发射爱心--每天的 hour几点  minute几分
function crontabSendLove() {
  schedule.scheduleJob({ hour: 17, minute: 20 }, function () {
    console.log("爱心启动");
    loveToSend()
  });
}

// 爱心启动
crontabSendLove()