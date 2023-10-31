import React, {useState, useEffect } from 'react';

import Image01 from '../../images/smiling-blush.png';
import Image02 from '../../images/smiling-face-with-sunglasses.png';
import Image03 from '../../images/smiling.png';
import Image04 from '../../images/winking.jpg';
import Image05 from '../../images/grin.png';

import {getFriends,getFriendInfo} from '../../../firebase'
const images = [Image01, Image02, Image03, Image04, Image05];

function DashboardCard10() {
  var [friends, setFriends] = useState([]);
  var friendsList = [];
  const updatedFriends = [];
  useEffect(() => {
    
    (async () => {
      friendsList = await JSON.parse(await getFriends()||"[]");
      for(let i = 0; i < 4; i++) {
        const friend = friendsList[i];
    
        const friendInfo = await Promise.all([
          getFriendInfo(friend, "name"),
          getFriendInfo(friend, "email"),
          getFriendInfo(friend, "status"),
        ]);
    
        friends.push({
          id: i.toString(),
          image: images[i],
          name: friendInfo[0],
          email: friendInfo[1],
          status: friendInfo[2] ? "Online" : "Offline",
          time: '0/0',
        });
        setFriends(updatedFriends);
      }
    
    })();
  }, []);
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
