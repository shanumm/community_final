"use client";
import ToastComponent from "@/custom_components/toast/toast";
import Grid from "../custom_components/background/grid";
import Navigation from "../custom_components/top_navigation/navigation";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useContext, useEffect, useRef, useState } from "react";
import Cards from "../custom_components/Custom_card/Cards";
import Image from "next/image";
import { MyContext } from "@/context/context";

export default function Home() {
  const [does_name_exist, set_name_exist] = useState(false);
  const { user, is_signedIn, handle_sign_in } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null); // Ref to access the input element
  const testing_function = async () => {
    const name = inputRef.current.value; // Get the value from the input using ref
    setLoading(true);

    if (name.length > 0) {
      const docRef = doc(db, "users", name);
      try {
        const docSnap = await getDoc(docRef); // Check if the document exists
        if (docSnap.exists()) {
          console.log("Document already exists with ID: ", name);
          set_name_exist(true);
          // You can show a message to the user, update the document, or handle it as needed
        } else {
          set_name_exist(false);
          await setDoc(docRef, {
            first: "Ada",
            last: "Lovelace",
            born: 1815,
          });
          console.log("Document written with ID: ", name);
        }
      } catch (e) {
        set_name_exist(false);
        console.error("Error checking/adding document: ", e);
      }
    } else {
      set_name_exist(false);
      console.error("Input is empty. Please enter a name.");
    }
    setLoading(false);
  };

 

  const Check_name = () => (
    <div className="flex mt-12 mb-2 h-auto items-center p-2 rounded-lg w-1/2 bg-white shadow-lg">
      <div className="flex-[2] flex">
        <div className="text-base mr-1 text-[#705BFE] font-semibold">
          domain.in/
        </div>
        <input
          type="text"
          className="outline-none font-semibold"
          placeholder="name"
          ref={inputRef} // Attach the ref to the input element
        />
      </div>
      <div
        className=" cursor-pointer border rounded-lg border-gray-200 bg-[#705BFE] text-white p-3 flex-1 text-center flex justify-center items-center"
        onClick={testing_function}
      >
        {!loading ? (
          <>
            <div className="mr-2">Claim</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </>
        ) : (
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <ToastComponent />

      <Grid color="#e4e4e4">
        <Navigation />

        <div className="hero flex  h-screen">
          <div className="flex-[2] mx-12  p-24">
            <div className="text-6xl font-bold pb-12">
              Start monetizing your group chats and communities in just seconds.
            </div>
            <div className="font-light">
              Easily connect your Discord, WhatsApp, or Slack channels and start
              earning right away—no platform fees involved! More platforms will
              be available soon, so stay tuned.
            </div>
            <Check_name />
            {does_name_exist && (
              <div className="text-red-500">Name already exists!</div>
            )}
            <div className="mt-12">
              <div className="py-2">Connect with : </div>
              <div className="flex mb-2 h-auto items-center p-2 rounded-lg w-fit bg-white border gap-4">
                <div className="rounded-full bg-gray-200 p-2 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#fff"
                      d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
                    ></path>
                    <path
                      fill="#cfd8dc"
                      d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
                    ></path>
                    <path
                      fill="#40c351"
                      d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
                    ></path>
                    <path
                      fill="#fff"
                      fill-rule="evenodd"
                      d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="rounded-full bg-gray-200 p-2 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#33d375"
                      d="M33,8c0-2.209-1.791-4-4-4s-4,1.791-4,4c0,1.254,0,9.741,0,11c0,2.209,1.791,4,4,4s4-1.791,4-4	C33,17.741,33,9.254,33,8z"
                    ></path>
                    <path
                      fill="#33d375"
                      d="M43,19c0,2.209-1.791,4-4,4c-1.195,0-4,0-4,0s0-2.986,0-4c0-2.209,1.791-4,4-4S43,16.791,43,19z"
                    ></path>
                    <path
                      fill="#40c4ff"
                      d="M8,14c-2.209,0-4,1.791-4,4s1.791,4,4,4c1.254,0,9.741,0,11,0c2.209,0,4-1.791,4-4s-1.791-4-4-4	C17.741,14,9.254,14,8,14z"
                    ></path>
                    <path
                      fill="#40c4ff"
                      d="M19,4c2.209,0,4,1.791,4,4c0,1.195,0,4,0,4s-2.986,0-4,0c-2.209,0-4-1.791-4-4S16.791,4,19,4z"
                    ></path>
                    <path
                      fill="#e91e63"
                      d="M14,39.006C14,41.212,15.791,43,18,43s4-1.788,4-3.994c0-1.252,0-9.727,0-10.984	c0-2.206-1.791-3.994-4-3.994s-4,1.788-4,3.994C14,29.279,14,37.754,14,39.006z"
                    ></path>
                    <path
                      fill="#e91e63"
                      d="M4,28.022c0-2.206,1.791-3.994,4-3.994c1.195,0,4,0,4,0s0,2.981,0,3.994c0,2.206-1.791,3.994-4,3.994	S4,30.228,4,28.022z"
                    ></path>
                    <path
                      fill="#ffc107"
                      d="M39,33c2.209,0,4-1.791,4-4s-1.791-4-4-4c-1.254,0-9.741,0-11,0c-2.209,0-4,1.791-4,4s1.791,4,4,4	C29.258,33,37.746,33,39,33z"
                    ></path>
                    <path
                      fill="#ffc107"
                      d="M28,43c-2.209,0-4-1.791-4-4c0-1.195,0-4,0-4s2.986,0,4,0c2.209,0,4,1.791,4,4S30.209,43,28,43z"
                    ></path>
                  </svg>
                </div>
                <div className="rounded-full bg-gray-200 p-2 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#536dfe"
                      d="M39.248,10.177c-2.804-1.287-5.812-2.235-8.956-2.778c-0.057-0.01-0.114,0.016-0.144,0.068	c-0.387,0.688-0.815,1.585-1.115,2.291c-3.382-0.506-6.747-0.506-10.059,0c-0.3-0.721-0.744-1.603-1.133-2.291	c-0.03-0.051-0.087-0.077-0.144-0.068c-3.143,0.541-6.15,1.489-8.956,2.778c-0.024,0.01-0.045,0.028-0.059,0.051	c-5.704,8.522-7.267,16.835-6.5,25.044c0.003,0.04,0.026,0.079,0.057,0.103c3.763,2.764,7.409,4.442,10.987,5.554	c0.057,0.017,0.118-0.003,0.154-0.051c0.846-1.156,1.601-2.374,2.248-3.656c0.038-0.075,0.002-0.164-0.076-0.194	c-1.197-0.454-2.336-1.007-3.432-1.636c-0.087-0.051-0.094-0.175-0.014-0.234c0.231-0.173,0.461-0.353,0.682-0.534	c0.04-0.033,0.095-0.04,0.142-0.019c7.201,3.288,14.997,3.288,22.113,0c0.047-0.023,0.102-0.016,0.144,0.017	c0.22,0.182,0.451,0.363,0.683,0.536c0.08,0.059,0.075,0.183-0.012,0.234c-1.096,0.641-2.236,1.182-3.434,1.634	c-0.078,0.03-0.113,0.12-0.075,0.196c0.661,1.28,1.415,2.498,2.246,3.654c0.035,0.049,0.097,0.07,0.154,0.052	c3.595-1.112,7.241-2.79,11.004-5.554c0.033-0.024,0.054-0.061,0.057-0.101c0.917-9.491-1.537-17.735-6.505-25.044	C39.293,10.205,39.272,10.187,39.248,10.177z M16.703,30.273c-2.168,0-3.954-1.99-3.954-4.435s1.752-4.435,3.954-4.435	c2.22,0,3.989,2.008,3.954,4.435C20.658,28.282,18.906,30.273,16.703,30.273z M31.324,30.273c-2.168,0-3.954-1.99-3.954-4.435	s1.752-4.435,3.954-4.435c2.22,0,3.989,2.008,3.954,4.435C35.278,28.282,33.544,30.273,31.324,30.273z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 p-2 flex flex-col pt-20">
            <div className="mt-2">
              <Cards
                have_svg={true}
                pill_text="Your Earnings"
                heading="$30.00"
                subheading="Number of members:"
                mainContainerClass="shadow-lg  translate-x-[-40px]"
                subtext="20,591"
              />
            </div>
            <div className="mt-4">
              <Cards
                heading="Connect Platforms"
                headingClassName="text-xl text-center"
                mainContainerClass={"p-1 shadow-lg"}
                custom_component={
                  <div className="flex-1 flex flex-col">
                    <div className="items-center flex justify-center">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 20 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 0H5C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10H15C17.76 10 20 7.76 20 5C20 2.24 17.76 0 15 0ZM15 8C13.34 8 12 6.66 12 5C12 3.34 13.34 2 15 2C16.66 2 18 3.34 18 5C18 6.66 16.66 8 15 8Z"
                          fill="#333A32"
                        />
                      </svg>
                    </div>
                    <div className="flex  flex-1 flex-col">
                      <div className="flex  justify-around flex-1">
                        <Image
                          src="/assets/social_icons/discord.png"
                          width={24}
                          height={24}
                          alt="Discord Icon"
                          className="object-contain"
                        />
                        <Image
                          src="/assets/social_icons/youtube.png"
                          width={24}
                          height={24}
                          alt="youtube Icon"
                          className="object-contain"
                        />
                        <Image
                          src="/assets/social_icons/instagram.png"
                          width={24}
                          height={24}
                          alt="instagram Icon"
                          className="object-contain"
                        />
                      </div>
                      <div className="flex  justify-around flex-1">
                        <Image
                          src="/assets/social_icons/whatsapp.png"
                          width={24}
                          height={24}
                          alt="whatsapp Icon"
                          className="object-contain"
                        />
                        <Image
                          src="/assets/social_icons/slack.png"
                          width={24}
                          height={24}
                          alt="slack Icon"
                          className="object-contain"
                        />
                        <Image
                          src="/assets/social_icons/facebook.png"
                          width={24}
                          height={24}
                          alt="facebook Icon"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </Grid>
    </main>
  );
}
