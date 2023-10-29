import React from 'react';

import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';

function DashboardCard10() {
  const friends = [
    {
      id: '0',
      image: Image01,
      name: 'Alex Shatov',
      email: 'alexshatov@gmail.com',
      status: 'Offline',
      time: '0/0',
    },
    {
      id: '1',
      image: Image02,
      name: 'Philip Harbach',
      email: 'philip.h@gmail.com',
      status: 'Online',
      time: '0/0',
    },
    {
      id: '2',
      image: Image03,
      name: 'Mirko Fisuk',
      email: 'mirkofisuk@gmail.com',
      status: 'Offline',
      time: '0/0',
    },
    {
      id: '3',
      image: Image04,
      name: 'Olga Semklo',
      email: 'olga.s@cool.design',
      status: 'Offline',
      time: '0/0',
    },
    {
      id: '4',
      image: Image05,
      name: 'Burak Long',
      email: 'longburak@gmail.com',
      status: 'Offline',
      time: '0/0',
    },
  ];

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
