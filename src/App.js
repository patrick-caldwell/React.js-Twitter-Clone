import React from "react";
import "./App.css";
var page = "home";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        path:
          "https://pbs.twimg.com/profile_images/1290192462896672768/5nyLL2EH_400x400.jpg",
        name: "Pat",
        at: "PatWebDev",
      },
    };
  }

  render() {
    console.log("page");
    switch (page) {
      case "home":
        return <Home user={this.state.user} />;
        break;
      case "profile":
        return <Profile />;
        break;
      default:
        return <Home user={this.state.user} />;
    }
  }
}

class ProfileTimeline extends React.Component {
  render() {
    return <div></div>;
  }
}

class Profile extends React.Component {
  render() {
    return (
      <div className="home">
        <Navbar />
        <ProfileTimeline user={this.props.user} />
        <Discover />
      </div>
    );
  }
}

class Tweet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      age: this.initAge(this.props.age, "age"),
      ageSuffix: this.initAge(this.props.age, "suffix"),
      repliesNumber: this.props.repliesNumber,
      isReplied: false,
      retweetsNumber: this.props.retweetsNumber,
      isRetweeted: false,
      likesNumber: this.props.likesNumber,
      isLiked: false,
      hoverLike: false,
    };
  }

  initAge(date, state) {
    let minute = date.getMinutes();
    let hour = date.getHours();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getYear();

    let now = new Date();
    let nowMinute = now.getMinutes();
    let nowHour = now.getHours();
    let nowDay = now.getDate();
    let nowMonth = now.getMonth();
    let nowYear = now.getYear();

    let age;
    let suffix;

    if (year !== nowYear) {
      age = nowYear - year;
      suffix = "y";
    } else if (month !== nowMonth) {
      age = nowMonth - month;
      suffix = "mth";
    } else if (day !== nowDay) {
      age = nowDay - day;
      suffix = "d";
    } else if (hour !== nowHour) {
      age = nowHour - hour;
      suffix = "h";
    } else {
      age = nowMinute - minute;
      suffix = "m";
    }
    // this.setState({
    //   ageSuffix: suffix,
    // });

    if (state === "age") return age;
    else return suffix;
  }

  tick() {
    this.setState((state) => ({
      age: this.initAge(this.props.age, "age"),
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000 * 60);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  toggleLike() {
    if (!this.state.isLiked) {
      this.setState({
        likesNumber: this.state.likesNumber + 1,
        isLiked: true,
      });
    } else {
      this.setState({
        likesNumber: this.state.likesNumber - 1,
        isLiked: false,
      });
    }
  }

  render() {
    const likeIcon = this.state.isLiked ? (
      <i className="fas fa-heart"></i>
    ) : (
      <i className="far fa-heart"></i>
    );
    const likeText = this.state.isLiked ? (
      <p class="tweet__likes--isLiked">{this.state.likesNumber}</p>
    ) : (
      <p>{this.state.likesNumber}</p>
    );

    return (
      <div className="tweet">
        <img
          className="tweet__pfp"
          src={this.props.path}
          alt={this.props.imgAlt}
        ></img>
        <div className="tweet__content">
          <div className="tweet__info">
            <p className="tweet__name">{this.props.name}</p>
            <p className="tweet__at">{this.props.at}</p>
            <p className="tweet__age">·</p>
            <p className="tweet__age">
              {this.state.age}
              {this.state.ageSuffix}
            </p>
          </div>
          <p className="tweet__text">{this.props.text}</p>
          <div className="tweet__interactions">
            <div className="tweet__replies">
              <i className="far fa-comment"></i>
              <p>{this.state.repliesNumber}</p>
            </div>
            <div className="tweet__retweets">
              <i className="fas fa-retweet"></i>
              <p>{this.state.retweetsNumber}</p>
            </div>
            <div
              className="tweet__likes"
              onMouseEnter={() => this.setState({ hoverLike: true })}
              onMouseLeave={() => this.setState({ hoverLike: false })}
              onClick={() => this.toggleLike()}
            >
              {likeIcon}
              {likeText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Timeline extends React.Component {
  render() {
    return (
      <div className="timeline">
        <div className="tlTweet">
          <img src={this.props.user.path} alt={this.props.user.name}></img>
          <div className="tlTweet__content">
            <textarea
              className="tlTweet__input"
              placeholder="What's happening?"
            ></textarea>
            <div className="tlTweet__actions">
              <div className="tlTweet__icons">
                <a href="/#">
                  <i className="fas fa-image"></i>
                </a>
                <a href="/#">
                  <i className="fas fa-poll"></i>
                </a>
                <a href="/#">
                  <i className="fas fa-smile-beam"></i>
                </a>
                <a href="/#">
                  <i className="fas fa-calendar-alt"></i>
                </a>
              </div>
              <div className="tlTweet__button">Tweet</div>
            </div>
          </div>
        </div>

        <Tweet
          path="https://pbs.twimg.com/profile_images/1290192462896672768/5nyLL2EH_400x400.jpg"
          imgAlt="Pat's Picture"
          name="Pat"
          at="PatWebDev"
          age={new Date("August 14, 2020 00:05:00")}
          text="This is a tweet recreated in React.js! It even correctly shows how old a tweet is! This tweet was created at 12:05AM on 06/14/20."
          repliesNumber={1}
          retweetsNumber={19}
          likesNumber={7}
        />
        <Tweet
          path="https://pbs.twimg.com/profile_images/1283404391630987264/QcXeMS3A_400x400.jpg"
          imgAlt="Ashley's Picture"
          name="Ashley"
          at="thecouchcoder_"
          age={new Date("August 17, 2020 10:00:00")}
          text="Do you prefer Flex Box or Grid?"
          repliesNumber={24}
          retweetsNumber={19}
          likesNumber={52}
        />
        <Tweet
          path="https://pbs.twimg.com/profile_images/1275749819609481218/QZDm2jFj_400x400.jpg"
          imgAlt="Saima Haq's Picture"
          name="Saima Haq"
          at="SaimaHaqx"
          age={new Date("August 16, 2020 16:27:00")}
          text="I'm looking to purchase a domain name to use as my personal website/portfolio later on. Could someone tell me where they recommend purchasing from and does it make any difference who the host is? Also, if I don't plan to use it yet, is there a way to reserve it?"
          repliesNumber={3}
          retweetsNumber={2}
          likesNumber={4}
        />
        <Tweet
          path="https://pbs.twimg.com/profile_images/1294509262404632576/O8WF_RQI_400x400.jpg"
          imgAlt="Anand Vermemer's Picture"
          name="Anand Vermemer"
          at="son_Of_Verma"
          age={new Date("August 16, 2020 10:02:00")}
          text="How many online courses you started and are pending from months? Mine, 7!"
          repliesNumber={10}
          retweetsNumber={4}
          likesNumber={22}
        />
        <Tweet
          path="https://pbs.twimg.com/profile_images/1222136283339853833/dr25E9Lk_400x400.jpg"
          imgAlt="Danny Thompson's Picture"
          name="Danny Thompson"
          at="DThompsonDev"
          age={new Date("August 18, 2020 02:02:00")}
          text="When watching a tutorial, don't just watch & type blindly. You won't learn like that! Make it your own! Did it teach you how to make a site for an ice cream store? Make one for an Italian restaurant! The basic structure is the same but you are making it your own!"
          repliesNumber={7}
          retweetsNumber={14}
          likesNumber={49}
        />
        <Tweet
          path="https://pbs.twimg.com/profile_images/3681972492/8ed406f7d19e188e4e8936b6836b2214_400x400.jpeg"
          imgAlt="(((Janet Swisher)))'s Picture"
          name="(((Janet Swisher)))"
          at="jmswisher"
          age={new Date("August 12, 2020 08:57:00")}
          text="I am climbing into the #MozillaLifeboat along with the rest of my team. If you'd like to hire some of the #techwriters who've helped build @MozDevNet into the trusted resource it is today -- now's your chance!"
          repliesNumber={40}
          retweetsNumber={300}
          likesNumber={555}
        />
        <Tweet
          path="https://pbs.twimg.com/profile_images/1731588715/jeremie-patonnier-150_400x400.jpg"
          imgAlt="Jérémie Patonnier's Picture"
          name="Jérémie Patonnier"
          at="JeremiePat"
          age={new Date("August 13, 2020 05:58:00")}
          text="Kudos to all my former colleagues from the MDN team, especially @sheppy @jmswisher @floscholz and @chrisdavidmills. MDN is the best doc for web dev because of their hard work over the years. To all MDN users, now is the time to tell @mozilla loudly how important MDN is for you"
          repliesNumber={40}
          retweetsNumber={300}
          likesNumber={555}
        />
        <Tweet
          path="https://pbs.twimg.com/profile_images/1268803859167748096/_6jT7tFU_400x400.jpg"
          imgAlt="Catalin Pit's Picture"
          name="Catalin Pit"
          at="catalinmpit"
          age={new Date("August 18, 2020 01:06:00")}
          text="Catalin learnt React before learning JavaScript fundamentals and ES6. Catalin didn't understand a thing, and started to hate React. Catalin is re-learning React after learning fundamentals and ES6. React makes a lot of sense now. Catalin likes React now. Don't be like Catalin"
          repliesNumber={34}
          retweetsNumber={57}
          likesNumber={401}
        />
      </div>
    );
  }
}

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbarContainer">
        <div className="navbar">
          <a href="/#" className="logo">
            <p>
              <i className="fab fa-twitter"></i>
            </p>
          </a>
          <a href="/#" className="currentPage">
            <p>
              <i className="fas fa-home"></i>
              Home
            </p>
          </a>
          <a href="/#">
            <p>
              <i className="fas fa-hashtag"></i>
              Explore
            </p>
          </a>
          <a href="/#">
            <p>
              <i className="fas fa-bell"></i>
              Notifications
            </p>
          </a>
          <a href="/#">
            <p>
              <i className="fas fa-envelope"></i>
              Messages
            </p>
          </a>
          <a href="/#">
            <p>
              <i className="fas fa-bookmark"></i>
              Bookmarks
            </p>
          </a>
          <a href="/#">
            <p>
              <i className="fas fa-list"></i>
              Lists
            </p>
          </a>
          <a
            href="/#"
            onClick={function () {
              page = "profile";
            }}
          >
            <p>
              <i className="fas fa-user"></i>
              Profile
            </p>
          </a>
          <a href="/#">
            <p>
              <i className="fas fa-ellipsis-h"></i>
              More
            </p>
          </a>
          <div className="navbar__tweet">Tweet</div>
        </div>
      </div>
    );
  }
}

class AccountPreview extends React.Component {
  render() {
    return (
      <div className="accountPreview">
        <div className="accountPreview__details">
          <img src={this.props.path} alt={this.props.name}></img>
          <div className="accountPreview__names">
            <p className="accountPreview__name">{this.props.name}</p>
            <p className="accountPreview__at">{this.props.at}</p>
          </div>
        </div>
        <div className="accountPreview__follow">Follow</div>
      </div>
    );
  }
}

class Discover extends React.Component {
  render() {
    return (
      <div className="discoverContainer">
        <div className="discover">
          <textarea
            className="discover__search"
            placeholder="Search Twitter"
          ></textarea>
          <div className="discover__trends">
            <div className="discover__trendsTitle">
              <p>Trends For You</p>
              <p>
                <i className="fas fa-cog"></i>
              </p>
            </div>
            <p className="discover__trendsItem">Web development</p>
            <p className="discover__trendsItem">HTML</p>
            <p className="discover__trendsItem">CSS</p>
            <p className="discover__trendsItem">JavaScript</p>
            <p className="discover__trendsItem">React.js</p>
            <p className="discover__trendsShowMore">Show more</p>
          </div>
          <div className="discover__who">
            <p className="discover__whoTitle">Who to follow</p>
            <AccountPreview
              path="https://pbs.twimg.com/profile_images/1290364331763200000/yXCiyoNY_400x400.jpg"
              name="Angela Chan"
              at="AngelaChan_26"
            />
            <AccountPreview
              path="https://pbs.twimg.com/profile_images/1265295224919789568/1ANQPcl7_400x400.jpg"
              name="Learn Python With Rune"
              at="PythonWithRune"
            />
            <p className="discover__whoShowMore">Show more</p>
          </div>
          <div className="discover__copyright">
            <p>Terms</p>
            <p>Privacy Policy</p>
            <p>Cookies</p>
            <p>Ads info</p>
            <p>More</p>
            <p>© 2020 Twitter, Inc.</p>
          </div>
        </div>
      </div>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Navbar />
        <Timeline user={this.props.user} />
        <Discover />
      </div>
    );
  }
}

export default App;
