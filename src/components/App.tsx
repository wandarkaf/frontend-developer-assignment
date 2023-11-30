import { ReactComponent as TimescaleLogo } from "../assets/logo.svg";
import { useState, useMemo } from "react";
import recipientsData from "../assets/recipientsData.json";
import groupBy from "lodash/groupBy";

import AppList from "./AppList";
import AppSearch from "./AppSearch";

const App = () => {
  const [recipients, setRecipients] = useState(recipientsData);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  //   utility
  const emailDomain = (email: string) => email.split("@").pop();

  const filterRecipients = useMemo(() => {
    return groupBy(
      recipients.filter((recipient) => recipient.email.includes(searchTerm)),
      ({ email }) => emailDomain(email)
    );
  }, [recipients, searchTerm]);

  const selectedRecipients = useMemo(
    () =>
      groupBy(
        recipients.filter((recipient) => recipient.isSelected),
        ({ email }) => emailDomain(email)
      ),
    [recipients]
  );

  const handleDataToggle = ({ email, isSelected }) => {
    setRecipients(
      recipients.map((recipient) => {
        if (recipient.email === email) {
          return { email, isSelected: !isSelected };
        }
        return recipient;
      })
    );
  };

  const handleGroupToggle = (items, value) => {
    const emails = items.map((item) => item.email);
    setRecipients(
      recipients.map((recipient) => {
        if (emails.includes(recipient.email)) {
          //   return { email: recipient.email, isSelected: !recipient.isSelected };
          return { email: recipient.email, isSelected: value };
        }
        return recipient;
      })
    );
  };

  return (
    <div className="container mx-auto my-4">
      <TimescaleLogo />
      <div className="flex w-full flex-wrap mt-6 justify-center gap-4">
        <AppList
          items={filterRecipients}
          handleToggle={handleDataToggle}
          handleGroupToggle={handleGroupToggle}
          showSelected={true}
          title="available recipients"
        >
          <AppSearch handleSearch={handleSearch} />
        </AppList>
        <AppList
          items={selectedRecipients}
          handleToggle={handleDataToggle}
          handleGroupToggle={handleGroupToggle}
          toggleBroadcastValue={false}
          title="selected recipients"
        />
      </div>
    </div>
  );
};

export default App;
