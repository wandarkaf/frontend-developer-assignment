import { ReactNode, useState } from "react";

type EmailItem = { email: string; isSelected: boolean };
type AppListProps = {
  items: {};
  handleToggle: (item: EmailItem) => void;
  handleGroupToggle: (items: EmailItem[], value: boolean) => void;
  children?: ReactNode;
  showSelected?: boolean;
  title: string;
  toggleBroadcastValue?: boolean;
};

const AppList = ({
  items,
  handleToggle,
  handleGroupToggle,
  children,
  showSelected = false,
  title,
  toggleBroadcastValue = true
}: AppListProps) => {
  const [hideGroupList, setHideGroupList] = useState([]);

  const handleHideGroupList = (key) => {
    if (hideGroupList.includes(key)) {
      setHideGroupList(hideGroupList.filter((item) => item !== key));
    } else {
      setHideGroupList([...hideGroupList, key]);
    }
  };

  const listItem = (items: EmailItem[]) => {
    return items.map((item) => (
      <li
        className={`text-base cursor-pointer ${
          item.isSelected && showSelected ? "text-blue-500" : ""
        }`}
        key={item.email}
        onClick={() => handleToggle(item)}
      >
        {item.email}
      </li>
    ));
  };
  return (
    <div className="w-96 flex flex-col gap-4 border-black border rounded-lg p-4 pt-8 relative">
      <h3 className="font-bold bg-white absolute p-2 -top-5 capitalize">
        {title}
      </h3>
      <div className="h-12">{children}</div>
      <div className="border-black border rounded-lg p-4">
        {Object.entries(items).length === 0 && <p className="text-center">No data</p>}
        {Object.entries(items).map(
          ([key, value]: [key: string, value: EmailItem[]]) => {
            if (value.length > 1) {
              return (
                <ul key={key}>
                  <li className="text-lg font-bold cursor-pointer">
                    <p className="flex gap-1 content-center">
                      <span
                        onClick={() => {
                          handleHideGroupList(key);
                        }}
                      >
                        {hideGroupList.includes(key) ? "►" : "▼"}
                      </span>
                      <span onClick={() => handleGroupToggle(value, toggleBroadcastValue)}>
                        {key}
                      </span>
                    </p>
                  </li>
                  <ul className={`ml-4 ${hideGroupList.includes(key) ? "overflow-y-hidden h-1": ""}`}>{listItem(value)}</ul>
                </ul>
              );
            }
            return <ul key={key}>{listItem(value)}</ul>;
          }
        )}
      </div>
    </div>
  );
};

export default AppList;
