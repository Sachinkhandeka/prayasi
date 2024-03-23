import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitterX } from "react-icons/bs";
import Brand from "./Brand";

export default function FooterComponent() {
    return(
        <>
        <Footer container className="border border-t-4 border-teal-600 bottom-0" >
            <div className="w-full max-w-7xl mx-auto" >
                <div className="grid w-full justify-between sm:flex md:grid-cols-1" >
                    <div className="mt-5" >
                        <Brand className={"self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"}  />
                    </div>
                    <div className="grid grid-cols-2 gap-8 md:gap-10 sm:mt-4 sm:grid-cols-3 text-start mt-10" >
                        <div>
                        <Footer.Title title="Get to Know Us" className="text-black dark:text-white font-bold" />
                        <Footer.LinkGroup col>
                            <Footer.Link href="/about" target="_blank" rel="noopener noreferer" >
                                About us
                            </Footer.Link>
                            <Footer.Link href="#" target="_blank" rel="noopener noreferer" >
                                Careers
                            </Footer.Link>
                            <Footer.Link href="#" target="_blank" rel="noopener noreferer" >
                                Press Releases
                            </Footer.Link>
                            <Footer.Link href="#" target="_blank" rel="noopener noreferer">
                                Prayasi Science 
                            </Footer.Link>
                        </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Connect with us" className="text-black dark:text-white font-bold" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="https://twitter.com/SachinK84576497" target="_blank" rel="noopener noreferer">
                                    Twitter
                                </Footer.Link>  
                                <Footer.Link href="https://github.com/Sachinkhandeka" target="_blank" rel="noopener noreferer">
                                    Github
                                </Footer.Link> 
                                <Footer.Link href="https://www.linkedin.com/in/sachin-khandeka/" target="_blank" rel="noopener noreferer">
                                    LinkedIn
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="legal" className="text-black dark:text-white font-bold"/>
                            <Footer.LinkGroup col>
                                <Footer.Link href="/privacy" target="_blank" rel="noopener noreferer"  >
                                    Privacy
                                </Footer.Link>
                                <Footer.Link href="/privacy" target="_blank" rel="noopener noreferer"  >
                                    Policy
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div>
                    <Footer.Copyright href="#" by="Prayasi blog"  year={new Date().getFullYear()}/>
                </div>
                <div className="sm:mt-4 mt-6 flex items-center gap-4 sm:justify-center" >
                    <Footer.Icon href="https://twitter.com/SachinK84576497" icon={BsTwitterX} />
                    <Footer.Icon href="https://www.linkedin.com/in/sachin-khandeka/" icon={BsLinkedin} />
                    <Footer.Icon href="https://github.com/Sachinkhandeka" icon={BsGithub} />
                    <Footer.Icon href="#" icon={BsFacebook} />
                    <Footer.Icon href="#" icon={BsInstagram} />         
                </div>
            </div>
        </Footer>
        </>
    )
}