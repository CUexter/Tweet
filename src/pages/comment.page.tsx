const Comment = () => {
  // console.log(props.userAc);

  return (
    <div className="container">
      <div className="row">
        <div style={{ textAlign: "right" }}>
          <button
            id="evClose"
            className="btn"

            //onClick={closeBtn}
          >
            Close
          </button>
        </div>
        <section
          id="comment"
          className="col-12"
          style={{ display: "inline-block" }}
        >
          <form>
            <div className="mb-3"></div>
            <div className="mb-3">
              <div id="comments"> </div>
              <label htmlFor="new-comment" className="form-label">
                Comment
              </label>
              <textarea
                className="form-control"
                id="new-comment"
                required
              ></textarea>
            </div>
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: "rosybrown", color: "white" }}
              //onClick={savefile}
            >
              Add comment
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Comment;
