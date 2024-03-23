export  default function About() {
    return (
        <>
        <div className="w-full" >
            <div>
                <div>
                    <h1 className="text-4xl font-semibold p-4" >Privacy Policy</h1>
                    <div className="w-full max-w-6xl" >
                        <h3 className="text-xl font-mono px-8 mt-2" >Welcome to Prayasi Blog, your go-to destination for creating and exploring captivating blogs!</h3>
                        <p className="text-gray-500 text-md leading-8 px-8 mt-2" >
                            At Prayasi, safeguarding your privacy and ensuring a secure experience are our top priorities. 
                            This Privacy Policy delineates the information we collect, its utilization, and the rights and 
                            permissions associated with different user roles, including viewers and administrators.
                        </p>
                    </div>
                    
                    <h2 className="text-2xl font-semibold px-4 mt-2" >Information We Collect:</h2>
                    <div className="w-full max-w-6xl" >
                        <p className="text-gray-500 text-md leading-8 px-8 mt-2" >
                            When you utilize Prayasi, we gather the following information:
                        </p>
                    </div>
                    <div className="w-full max-w-6xl px-8 my-4 grid grid-cols-1 md:grid-cols-2 gap-2" >
                        <div>
                            <h4 className="w-full px-10 font-bold text-2xl"><span className="text-gray-400" >1. </span>Personal Information:</h4> 
                            <p className="text-gray-500 px-14 my-2" >
                                When signing in either through personal credentials or Google, 
                                we collect your name, email address, and any other pertinent 
                                details furnished during registration.
                            </p>
                        </div>
                        <div>
                            <h4 className="w-full px-10 font-bold text-2xl" ><span className="text-gray-400" >2. </span>Usage Information:</h4> 
                            <p className="text-gray-500 px-14 my-2" >
                                We gather data regarding your interactions with our blog web app, 
                                including viewed blog posts and posted comments.
                            </p>
                        </div>
                        <div>
                            <h4 className="w-full px-10 font-bold text-2xl" ><span className="text-gray-400" >3. </span>Comments and Blog Posts:</h4> 
                            <p className="text-gray-500 px-14 my-2" >
                                All comments made on blog posts or any content created by 
                                administrators, such as blog posts, are collected and stored.
                            </p>
                        </div>
                        <div>  
                            <h4 className="w-full px-10 font-bold text-2xl" ><span className="text-gray-400" >4. </span>Administrative Actions: </h4> 
                            <p className="text-gray-500 px-14 my-2" >
                                Administrative activities, such as creating or removing blog posts, 
                                managing user accounts, moderating comments, and accessing all platform data, are recorded.
                            </p>
                        </div>  
                    </div>
                    
                    <h2 className="text-2xl font-semibold px-4 mt-2" >How We Use Your Information</h2>
                    <div className="w-full max-w-6xl" >
                        <p className="text-gray-500 text-md leading-8 px-8 mt-2" >
                            We employ the collected information for the following purposes:
                        </p>
                    </div>
                    <div className="w-full max-w-6xl px-8 my-4 grid grid-cols-1 md:grid-cols-2 gap-2" >
                        <div>
                            <h4 className="w-full px-10 font-bold text-2xl"><span className="text-gray-400" >1. </span>Service Provision:</h4> 
                            <p className="text-gray-500 px-14 my-2" >
                                Utilizing your personal information enables us to provide 
                                the services offered by Prayasi, facilitating access to blog posts, 
                                comment submission, and administrative features.
                            </p>
                        </div>
                        <div>
                            <h4 className="w-full px-10 font-bold text-2xl" ><span className="text-gray-400" >2. </span>Service Enhancement</h4> 
                            <p className="text-gray-500 px-14 my-2" >
                                Analysis of user behavior and feedback aids in refining our website, 
                                content, and overall user experience.
                            </p>
                        </div>
                        <div>
                            <h4 className="w-full px-10 font-bold text-2xl" ><span className="text-gray-400" >3. </span>User Communication:</h4> 
                            <p className="text-gray-500 px-14 my-2" >
                                Important updates, announcements, or promotional materials pertaining 
                                to Prayasi may be disseminated. Additionally, we address inquiries and 
                                support requests promptly.
                            </p>
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold px-4 mt-4" >Data Security</h2>
                    <div className="w-full max-w-6xl" >
                        <p className="text-gray-500 text-md leading-8 px-8 mt-2" >
                            We employ industry-standard security measures to safeguard your 
                            information against unauthorized access, alteration, 
                            or disclosure. This includes encryption, access controls, 
                            and routine security assessments.
                        </p>
                    </div>
                    <h2 className="text-2xl font-semibold px-4 mt-4" >Legal Disclosure</h2>
                    <div className="w-full max-w-6xl" >
                        <p className="text-gray-500 text-md leading-8 px-8 mt-2" >
                            We may disclose your information if mandated by law or in response 
                            to valid legal requests from governmental authorities.
                        </p>
                    </div>
                    <h2 className="text-2xl font-semibold px-4 mt-4" >Changes to This Policy</h2>
                    <div className="w-full max-w-6xl" >
                        <p className="text-gray-500 text-md leading-8 px-8 mt-2 mb-8" >
                            We reserve the right to update this Privacy Policy periodically to reflect alterations 
                            in our practices or legal requirements. Notification of significant changes will be 
                            disseminated via email or prominently posted on our website.

                            By utilizing Prayasi, you consent to the stipulations outlined in this Privacy Policy.

                            For any inquiries or concerns regarding this Privacy Policy, please contact us at <a href="#">contact@prayasi.com.</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}