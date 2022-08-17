import React from "react";

export const Tabs = ({ color, description, features = [] }) => {
  const [openTab, setOpenTab] = React.useState(1);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 flex-row"
            role="tablist"
          >
            <li className="-mb-px last:mr-0 text-center">
              <a
                className={
                  "text-s font-Poppins font-bold uppercase px-5 py-5 shadow-lg block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-secondary"
                    : "text-secondary bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Description
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 text-center">
              <a
                className={
                  "text-s font-Poppins font-bold uppercase px-5 py-5 shadow-lg block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-secondary"
                    : "text-secondary bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Features
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white text-black w-full mb-6 shadow-lg">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                {openTab === 1 ? (
                  <div className="text-l font-Poppins whitespace-pre-wrap leading-8">
                    {description}
                  </div>
                ) : (
                  <div className="flex flex-wrap">
                    {features.length !== 0 &&
                      features.map((feature, index) => (
                        <span
                          className="bg-secondary text-white font-Inter rounded px-3 py-3 font-medium mr-2 mb-2"
                          key={index}
                        >
                          {feature}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
