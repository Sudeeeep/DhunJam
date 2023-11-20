import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Chart as ChartJS, plugins } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Graph } from "./Graph";

export const Dashboard = ({ user }) => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [newAmount, setNewAmount] = useState(null);

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  async function fetchAdminDetails() {
    const {
      data: { data },
    } = await axios.get(`https://stg.dhunjam.in/account/admin/${user.id}`);
    setAdminDetails(data);
  }

  if (adminDetails && !newAmount) {
    setNewAmount(adminDetails.amount);
  }
  async function handleSave(e) {
    e.preventDefault();

    const updatedAmount = {};
    Object.keys(newAmount).forEach((key) => {
      if (newAmount[key] !== adminDetails.amount[key]) {
        updatedAmount[key] = newAmount[key];
      }
    });

    if (Object.keys(updatedAmount).length > 0) {
      try {
        const res = await axios.put(
          `https://stg.dhunjam.in/account/admin/${user.id}`,
          {
            amount: updatedAmount,
          }
        );
      } catch (err) {
        console.log(err);
      }
      fetchAdminDetails();
    }
  }

  if (adminDetails && newAmount) {
    return (
      <div className="dashboard-container">
        <h1 className="dashboard-header">{`${adminDetails.name}, ${adminDetails.location} on Dhun Jam`}</h1>
        <form className="admin-form" onSubmit={handleSave}>
          <div className="field-container">
            <div className="charge-customer">
              <div className="charge-customer-text">
                Do you want to charge your customers for requesting songs?
              </div>
              <div className="charge-customer-input-container">
                <div>
                  <input
                    type="radio"
                    name="charge-customer"
                    id="yes"
                    value="true"
                    checked={adminDetails.charge_customers}
                    onChange={() =>
                      setAdminDetails({
                        ...adminDetails,
                        charge_customers: true,
                      })
                    }
                  />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="charge-customer"
                    id="no"
                    value="false"
                    checked={!adminDetails.charge_customers}
                    onChange={() =>
                      setAdminDetails({
                        ...adminDetails,
                        charge_customers: false,
                      })
                    }
                  />
                  <label htmlFor="no">No</label>
                </div>
              </div>
            </div>

            <div className="custom-song-amount">
              <div className="custom-song-amount-text">
                Custom song request amount -
              </div>

              <input
                type="number"
                className="custom-song-amount-input"
                name="custom-song"
                defaultValue={newAmount.category_6}
                min={99}
                disabled={!adminDetails.charge_customers}
                onChange={(e) => {
                  let intValue = parseInt(e.target.value);
                  if (e.target.value === "") intValue = 0;
                  setNewAmount({
                    ...newAmount,
                    category_6: intValue,
                  });
                }}
                required
              />
            </div>

            <div className="regular-song-amount">
              <div className="regular-song-amount-text">
                Regular song request amounts, from high to low -
              </div>
              <div className="regular-song-amount-input">
                <div>
                  <input
                    type="number"
                    className="custom-song-amount-input"
                    name="custom-song"
                    defaultValue={newAmount.category_7}
                    min={79}
                    onChange={(e) => {
                      let intValue = parseInt(e.target.value);
                      if (e.target.value === "") intValue = 0;
                      setNewAmount({
                        ...newAmount,
                        category_7: intValue,
                      });
                    }}
                    disabled={!adminDetails.charge_customers}
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    className="custom-song-amount-input"
                    name="custom-song"
                    defaultValue={newAmount.category_8}
                    min={59}
                    onChange={(e) => {
                      let intValue = parseInt(e.target.value);
                      if (e.target.value === "") intValue = 0;
                      setNewAmount({
                        ...newAmount,
                        category_8: intValue,
                      });
                    }}
                    disabled={!adminDetails.charge_customers}
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    className="custom-song-amount-input"
                    name="custom-song"
                    defaultValue={newAmount.category_9}
                    min={39}
                    onChange={(e) => {
                      let intValue = parseInt(e.target.value);
                      if (e.target.value === "") intValue = 0;
                      setNewAmount({
                        ...newAmount,
                        category_9: intValue,
                      });
                    }}
                    disabled={!adminDetails.charge_customers}
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    className="custom-song-amount-input"
                    name="custom-song"
                    defaultValue={newAmount.category_10}
                    min={19}
                    onChange={(e) => {
                      let intValue = parseInt(e.target.value);
                      if (e.target.value === "") intValue = 0;
                      setNewAmount({
                        ...newAmount,
                        category_10: intValue,
                      });
                    }}
                    disabled={!adminDetails.charge_customers}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {adminDetails.charge_customers && <Graph graphData={newAmount} />}

          <button
            className="save-btn"
            disabled={
              !adminDetails.charge_customers ||
              newAmount.category_6 < 99 ||
              newAmount.category_7 < 79 ||
              newAmount.category_8 < 59 ||
              newAmount.category_9 < 39 ||
              newAmount.category_10 < 19
            }
          >
            Save
          </button>
        </form>
      </div>
    );
  }
};

Dashboard.propTypes = {
  user: PropTypes.object,
};
