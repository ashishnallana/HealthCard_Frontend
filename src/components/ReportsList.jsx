import React, { useEffect, useState } from "react";
import axios from "axios";

function ReportsList({ id }) {
  const [reports, setReports] = useState([]);

  const dateFormatter = (d) => {
    const newDate = new Date(d);
    const formattedDate = newDate.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return formattedDate;
  };

  const fetchReports = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/user/fetch-user-reports?id=${id}`
      );
      console.log(res);
      if (res.data.success) {
        setReports(res.data.reports);
      }
      //  else {
      //   toast.error(res.data.message);
      // }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log(id);
    fetchReports();
  }, []);

  return (
    <div className="mt-3 px-3" >
       <h1 className="px-3 text-xl font-semibold">ALL REPORTS</h1>
      <div>
        {reports.map((e, i) => (
          <div className="flex flex-col space-y-2 m-2 bg-black text-white px-2 py-1 rounded-md text-md  hover:text-slate-900 hover:bg-blue-700">
            <p>org id : {e.org_id}</p>
            {e.files.map((f, j) => (
              <a
                href={f}
                target="_blank"
                className="text-sm"
              >
                file {j + 1}
              </a>
            ))}
            <p className="text-sm flex ">{dateFormatter(e.updatedAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportsList;