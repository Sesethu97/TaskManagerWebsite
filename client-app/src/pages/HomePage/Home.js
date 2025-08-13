function Home() {
  return (
    <div className="w-full px-2">
      <div className="p-6 rounded-md bg-slate-300 max-h-svh">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-semibold">Tasks board- landing page</h2>
          <div class="grid grid-cols-4 gap-4">
            <div className="flex flex-col">
              <div className="bg-white h-[30px] w-full rounded-md shadow flex items-center justify-center font-semibold">
                To Do
              </div>
              <div className="mt-2 flex-1 bg-gray-100 rounded-md p-2">
                Tasks go here
              </div>
            </div>

            <div className="flex flex-col">
              <div className="bg-white h-[30px] w-full rounded-md shadow flex items-center justify-center font-semibold">
                In Progress
              </div>
              <div className="mt-2 flex-1 bg-gray-100 rounded-md p-2">
                Tasks go here
              </div>
            </div>

            <div className="flex flex-col">
              <div className="bg-white h-[30px] w-full rounded-md shadow flex items-center justify-center font-semibold">
                On Hold
              </div>
              <div className="mt-2 flex-1 bg-gray-100 rounded-md p-2">
                Tasks go here
              </div>
            </div>

            <div className="flex flex-col">
              <div className="bg-white h-[30px] w-full rounded-md shadow flex items-center justify-center font-semibold">
                Complete
              </div>
              <div className="mt-2 flex-1 bg-gray-100 rounded-md p-2">
                Tasks go here
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
