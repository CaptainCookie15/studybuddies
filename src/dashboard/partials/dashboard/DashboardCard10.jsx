import React from 'react';

import Image01 from '../../images/smiling-blush.png';
import Image02 from '../../images/smiling-face-with-sunglasses.png';
import Image03 from '../../images/smiling.png';
import Image04 from '../../images/winking.jpg';
import Image05 from '../../images/grin.png';

import {updatedFriendInfo} from '../../../firebase'

function DashboardCard10() {
  let friendsList = JSON.parse(localStorage.getItem("friends")||'["None","None","None","None","None"]')
  var friends = [
    {
      id: '0',
      image: Image01,
      name: updatedFriendInfo(friendsList[0],"name"),
      email: updatedFriendInfo(friendsList[0],"email"),
      status: updatedFriendInfo(friendsList[0],"status")? "Online":"Offline",
      time: '0/0',
    },
    {
      id: '1',
      image: Image02,
      name: friendsList[1],
      email: updatedFriendInfo(friendsList[1],"email"),
      status: updatedFriendInfo(friendsList[1],"status")? "Online":"Offline",
      time: '0/0',
    },
    {
      id: '2',
      image: Image03,
      email: updatedFriendInfo(friendsList[2],"email"),
      status: updatedFriendInfo(friendsList[2],"status")? "Online":"Offline",
      time: '0/0',
    },
    {
      id: '3',
      image: Image04,
      email: updatedFriendInfo(friendsList[3],"email"),
      status: updatedFriendInfo(friendsList[3],"status")? "Online":"Offline",
      time: '0/0',
    },
    {
      id: '4',
      image: Image05,
      email: updatedFriendInfo(friendsList[4],"email"),
      status: updatedFriendInfo(friendsList[4],"status")? "Online":"Offline",
      time: '0/0',
    },
  ];
  console.log(friends)
  
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Friends</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Last Online</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Status</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                friends.map(friends => {
                  return (
                    <tr key={friends.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src={friends.image} width="40" height="40" alt={friends.name} />
                          </div>
                          <div className="font-medium text-slate-800 dark:text-slate-100">{friends.name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{friends.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{friends.time}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className={"text-left font-medium text-"+(friends.status=="Online" ? 'green' : 'red')+"-500"}>{friends.status}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default DashboardCard10;
