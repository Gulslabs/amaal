"use client";
import { FC, useState } from "react";
import { Amaal, DayAmaal, DayAmaalRowProps } from "../utils/types";

const DayAmaalRow: FC<DayAmaalRowProps> = ({ dayAmaal, token }) => {
  if (!dayAmaal || !dayAmaal.amaals) {
    return <div>Loading dayAmaal.....</div>; // Placeholder for loading state
  }
  // const { date, isEditable: isEditable, amaals } = dayAmaal;
  const { date, isEditable, amaals } = dayAmaal;
  const [amaalsState, setAmaalsState] = useState<Amaal[]>(amaals);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handlePerformed = (index: number, value: boolean) => {
    // console.log(`Index in Performed: ${index}`);
    const newAmaals = [...amaalsState];
    newAmaals[index].perfomed = value;
    // Set duration to 0 if performed is set to false
    if (!value) {
      newAmaals[index].duration = 0;
    }
    setAmaalsState(newAmaals);
  };

  const handleDuration = (index: number, value: number) => {
    // console.log(`Index in Performed: ${index}`);
    const newAmaals = [...amaalsState];
    newAmaals[index].duration = value;
    setAmaalsState(newAmaals);
  };

  const handleUpdate = async () => {    
    await updateAmaal({ ...dayAmaal, amaals: amaalsState });
  };

  const updateAmaal = async (dayAmaal: DayAmaal) => {
    setIsUpdating(true);
    // console.log(`Updated Amaal: ${JSON.stringify(dayAmaal)}`);
    try {
      const response = await fetch(`http://localhost:3001/api/amaal`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dayAmaal),
      });
      const result = await response.json();
      console.log(`Amaal Update Successful: ${result}`);
    } catch (err) {
    } finally {
      setTimeout(() => {
        setIsUpdating(false);
      }, 1000);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 m-4">
      <div>
        <div className="text-center font-bold text-lg mb-4">
          {new Date(date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </div>
        <div className="flex justify-around">
          {amaalsState.map((amaal, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{amaal.category}</span>
                <div className="flex items-center">
                  {amaal.kind === "TIME_BASED" && (
                    <div>
                      <input
                        type="number"
                        value={amaal.duration}
                        onChange={(e) =>
                          handleDuration(
                            amaalsState.indexOf(amaal),
                            parseInt(e.target.value)
                          )
                        }
                        className="border border-gray-300 rounded p-1 w-20"
                        disabled={!isEditable || !amaal.perfomed}
                        min="0"
                      />
                      <span className="ml-2">mins</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-2">Performed</span>
                <label className="mr-2">
                  <input
                    type="radio"
                    name={`performed-${date}-${
                      amaal.category
                    }-${amaalsState.indexOf(amaal)}`}
                    checked={amaal.perfomed}
                    onChange={() =>
                      handlePerformed(amaalsState.indexOf(amaal), true)
                    }
                    disabled={!isEditable}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={`performed-${date}-${
                      amaal.category
                    }-${amaalsState.indexOf(amaal)}`}
                    checked={!amaal.perfomed}
                    onChange={() =>
                      handlePerformed(amaalsState.indexOf(amaal), false)
                    }
                    disabled={!isEditable}
                  />
                  No
                </label>
              </div>
            </div>
          ))}
          <button
            onClick={() => handleUpdate()} // Call the onUpdate function on button click
            className={`self-center mt-4 px-4 py-2 rounded text-white ${
              !isEditable ? "bg-gray-400" : "bg-blue-500"
            }`}
            disabled={!isEditable || isUpdating} // Disable the button if not editable
          >
            {isUpdating ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayAmaalRow;
