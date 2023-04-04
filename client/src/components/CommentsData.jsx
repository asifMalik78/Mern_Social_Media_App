import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { UilTimes } from "@iconscout/react-unicons";
import {Link} from "react-router-dom";
TimeAgo.addLocale(en);

const CommentsData = ({ curr, deleteComment, userId }) => {
  const timeAgo = new TimeAgo("en-US");
  return (
    <div className="comment" key={curr._id}>
      <Link to={`/profile/${curr.commentBy._id}`}>
        <div className="comment-img">
          <img src={curr.commentBy.img} alt="img" />
        </div>
      </Link>

      <div className="comment-content">
        <div className="content">
          {curr.commentDesc}
          <div className="wrapper">
            <div className="comment-time">
              {timeAgo.format(new Date(curr.createdAt))}
            </div>
            {userId === curr.commentBy._id && (
              <div className="comment-delete-btn">
                <UilTimes onClick={() => deleteComment(curr._id)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsData;
