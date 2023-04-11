import { api } from "@/utils/api";
import { useState } from "react";

import Displaycard from "../components/displaycard";

const DisplayFollowing = () => {
  const [isLoading, setIsLoading] = useState(true);

  const displayfollowingQuery = api.following.displayfollowing.useQuery(
    //find the followings of the current user
    { user_id: "123" },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
    }
  );
  console.log(displayfollowingQuery.data);

  return (
    <>
      {!isLoading && (
        <>
          <div></div>
          <div>
            <h1>
              {displayfollowingQuery.data
                ? displayfollowingQuery.data?.map((data, i) => (
                    <div key={data.id}>
                      <Displaycard {...data} />
                    </div>
                  ))
                : "You have 0 followings"}
            </h1>
            <h1></h1>
          </div>
        </>
      )}
    </>
  );
};

export default DisplayFollowing;
