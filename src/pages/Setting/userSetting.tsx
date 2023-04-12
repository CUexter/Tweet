import AccountInfo from "@/components/userSetting/accountInfo";
import DeleteAccount from "@/components/userSetting/deleteAccount";
import PrivacySetting from "@/components/userSetting/privacySetting";
import { createStyles } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  a: { width: "100%", height: 50, borderBottomWidth: 3, borderTopWidth: 3 },
  mainBlock: { width: "35%", backgroundColor: theme.colors.blue[0] },
  tbodyStyle: { width: "100%" },
  card: { transition: "0.3" },
  mainPage: { width: "100%", height: "100%" },
}));

export default function a() {
  const [renderContent, setRenderContent] = useState("Setting");
  const [session, setSession] = useState(useSession());
  console.log(session);

  const { classes } = useStyles();
  var content = (
    <>
      <tr>
        <td
          className={classes.a}
          onClick={() => setRenderContent("AccountInfo")}
        >
          Account Information
        </td>
      </tr>
      <tr>
        <td
          className={classes.a}
          onClick={() => setRenderContent("PrivacySetting")}
        >
          Privacy Settings
        </td>
      </tr>
      <tr>
        <td
          className={classes.a}
          onClick={() => setRenderContent("DeleteAccount")}
        >
          Delete Account
        </td>
      </tr>
    </>
  );
  var subcontent = <></>;
  switch (renderContent) {
    case "AccountInfo": {
      subcontent = <AccountInfo />;
      break;
    }
    case "DeleteAccount": {
      subcontent = <DeleteAccount />;
      break;
    }
    case "PrivacySetting": {
      subcontent = <PrivacySetting />;
      break;
    }
  }

  function fullHeight() {
    return (
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next {
          height: 100%;
        }
      `}</style>
    );
  }
  //if (session.data!=null)
  return (
    <main className={classes.mainPage}>
      {fullHeight()}
      <style jsx>{`
        .c {
          position: absolute;
          top: 25%;
          left: 35%;
        }
      `}</style>
      <div className={classes.mainBlock + " " + classes.card + " " + "c"}>
        <table className={classes.tbodyStyle}>
          <tbody className={classes.tbodyStyle}>
            {renderContent == "Setting" ? (
              content
            ) : (
              <tr onClick={() => setRenderContent("Setting")}>
                <td className={classes.a}>Back</td>
              </tr>
            )}
          </tbody>
        </table>
        {renderContent == "Setting" ? <></> : subcontent}
      </div>
    </main>
  );
  // else return <div>INVALID SESSION</div>
}
