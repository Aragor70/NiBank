
import { IonHeader, IonToolbar, IonLabel, IonInput, IonItemDivider, IonButton, IonCard, IonCardContent, IonCardHeader, IonList, IonItem, IonListHeader, IonCheckbox, IonNav, IonIcon, IonRouterLink, IonText, IonCardTitle, IonCardSubtitle, IonAvatar } from '@ionic/react';
import { Fragment } from 'react';
import { checkmark } from 'ionicons/icons';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface TermsAndConditionsUI {
    formData: any,
    setFormData: any,
    history: any
}

const TermsAndConditions: React.FC<TermsAndConditionsUI | any> = ({ formData, setFormData, history, step, setStep }) => {

    const { termsAndConditions, accountType } = formData;



  return (
      <Fragment>

        
        <IonCard>
        
        <IonCardHeader>
        
            <IonCardTitle className="ion-items-center" mode="md">
                Terms {"&"} Conditions

            </IonCardTitle>

        </IonCardHeader>

        <IonCardContent>
        <IonList>
        <IonItem>
        <IonText>
            Welcome to NiVest!
            These terms and conditions outline the rules and regulations for the use of Company App, located at NiVest.com.

        </IonText>
        </IonItem>
        <IonItem>
        <IonText>
            By accessing this Application we assume you accept these terms and conditions. Do not continue to use NiVest App if you do not agree to take all of the terms and conditions stated on this page.


        </IonText>
        </IonItem>
        <IonItem>
        <IonText>
            The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this Application and compliant to the NiVest's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Google. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.


        </IonText>
        </IonItem>

        </IonList>
        </IonCardContent>
        </IonCard>

        <IonCard>
        <IonCardHeader>
            <IonCardTitle mode="md">
                Cookies
            </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
            <IonList>
        <IonItem>
        <IonText>
            We employ the use of cookies. By accessing NiVest App, you agreed to use cookies in agreement with the NiVest's Privacy Policy.

        </IonText>
        </IonItem>
        <IonItem>
        <IonText>
            Most interactive Applications use cookies to let us retrieve the your uploaded content details for each visit. Cookies are used by our Application to enable the functionality of certain areas to make it easier for people visiting our Application. Some of our affiliate/advertising partners may also use cookies.

        </IonText>
        </IonItem>
        <IonItem>
            You must not:



        </IonItem>
        <IonItem>
            
            <IonAvatar slot="start">
                <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
            </IonAvatar>
            <IonLabel>
            <IonText className="ion-text-wrap">
                Republish material from NiVest App

            </IonText>
            </IonLabel>


        </IonItem>
        <IonItem>
            
            <IonAvatar slot="start">
                <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
            </IonAvatar>
            <IonLabel>
            <IonText className="ion-text-wrap">
                Sell, rent or sub-license material from NiVest App


            </IonText>
            </IonLabel>


        </IonItem>
        <IonItem>
            
            <IonAvatar slot="start">
                <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
            </IonAvatar>
            <IonLabel>
            <IonText className="ion-text-wrap">
                Reproduce, duplicate or copy material from NiVest App


            </IonText>
            </IonLabel>


        </IonItem>
        <IonItem>
            
            <IonAvatar slot="start">
                <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
            </IonAvatar>
            <IonLabel>
            <IonText className="ion-text-wrap">
                Redistribute content from NiVest Service


            </IonText>
            </IonLabel>


        </IonItem>
        <IonItem>
        <IonText>
            
            This Agreement shall begin on the date hereof.

        </IonText>
        </IonItem>
        <IonItem>
        <IonText>
            Parts of this Application offer an opportunity for users to post and exchange opinions and information in certain areas of the Application. NiVest does not filter, edit, publish or review your uploaded content content prior to their presence on the Application. your uploaded content content do not reflect the views and opinions of NiVest, its agents and/or affiliates. your uploaded content content reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, NiVest shall not be liable for the your uploaded content content or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the your uploaded content content on this Application.


        </IonText>
        </IonItem>
        <IonItem>
        <IonText>
            NiVest reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.

        </IonText>
        </IonItem>
        <IonItem>
        <IonText>
            You warrant and represent that:


        </IonText>
        </IonItem>
        <IonItem>
            
            <IonAvatar slot="start">
                <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
            </IonAvatar>
            <IonLabel>
            <IonText className="ion-text-wrap">
                You are entitled to post the Comments on our Application and have all necessary licenses and consents to do so;



            </IonText>
            </IonLabel>


        </IonItem>
        <IonItem>
            
            <IonAvatar slot="start">
                <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
            </IonAvatar>
            <IonLabel>
            <IonText className="ion-text-wrap">
                The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;




            </IonText>
            </IonLabel>


        </IonItem>
        <IonItem>
            
            <IonAvatar slot="start">
                <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
            </IonAvatar>
            <IonLabel>
            <IonText className="ion-text-wrap">
                The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy




            </IonText>
            </IonLabel>


        </IonItem>
        <IonItem>
            
            <IonAvatar slot="start">
                <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
            </IonAvatar>
            <IonLabel>
            <IonText className="ion-text-wrap">
                The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.




            </IonText>
            </IonLabel>


        </IonItem>
        
        <IonItem>
            
            You hereby grant NiVest a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.




        </IonItem>
        </IonList>
        </IonCardContent>
            
        </IonCard>
        
        <IonCard>
        <IonCardHeader>
            <IonCardTitle mode="md">
                Hyperlinking to our Content

            </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
            <IonList>
            <IonItem>
                <IonText>
                    The following organizations may link to our Application without prior written approval:

                </IonText>
            </IonItem>
            <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    Government agencies;




                </IonText>
                </IonLabel>


            </IonItem>
            <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    Search engines;




                </IonText>
                </IonLabel>


            </IonItem>
            <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    News organizations;




                </IonText>
                </IonLabel>


            </IonItem>
            <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    Online directory distributors may link to our Application in the same manner as they hyperlink to the Applications of other listed businesses; and




                </IonText>
                </IonLabel>


            </IonItem>
            <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.

                </IonText>
                </IonLabel>


            </IonItem>
            <IonItem>
            <IonText>
                These organizations may link to our home page, to publications or to other Application information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.

            </IonText>
            </IonItem>
            <IonItem>
            <IonText>
                We may consider and approve other link requests from the following types of organizations:


            </IonText>
            </IonItem>
            <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    commonly-known consumer and/or business information sources;

                </IonText>
                </IonLabel>


            </IonItem>
            <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    dot.com community sites;

                </IonText>
                </IonLabel>


            </IonItem>
            <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    associations or other groups representing charities;


                </IonText>
                </IonLabel>


            </IonItem>
            <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    online directory distributors;


                </IonText>
                </IonLabel>


            </IonItem>
            <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    internet portals;


                </IonText>
                </IonLabel>


            </IonItem>
            <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    accounting, law and consulting firms; and


                </IonText>
                </IonLabel>


            </IonItem>
            <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    educational institutions and trade associations.


                </IonText>
                </IonLabel>


            </IonItem>
            <IonItem>
            <IonText>
                We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of NiVest; and (d) the link is in the context of general resource information.

            </IonText>
            </IonItem>
            <IonItem>
            <IonText>
                These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.


            </IonText>
            </IonItem>
            <IonItem>
            <IonText>
                If you are one of the organizations listed in paragraph 2 above and are interested in linking to our Application, you must inform us by sending an e-mail to NiVest. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Application, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.

            </IonText>
            </IonItem>
            <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    By use of our corporate name; or



                </IonText>
                </IonLabel>


            </IonItem>
            <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    By use of the uniform resource locator being linked to; or




                </IonText>
                </IonLabel>


            </IonItem>
            <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    By use of any other description of our Application being linked to that makes sense within the context and format of content on the linking party's site.


                </IonText>
                </IonLabel>


            </IonItem>
            <IonItem>
                No use of NiVest's logo or other artwork will be allowed for linking absent a trademark license agreement.


            </IonItem>
            </IonList>
        </IonCardContent>
        </IonCard>
        <IonCard>
        <IonCardHeader>
            <IonCardTitle mode="md">
                iFrames
            </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
            <IonItem>
            <IonText>
                Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Application.

            </IonText>
            </IonItem>
        </IonCardContent>
        </IonCard>
        <IonCard>
        <IonCardHeader>
            <IonCardTitle mode="md">
                Content Liability

            </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
            <IonItem>
            <IonText>
                We shall not be hold responsible for any content that appears on your Application. You agree to protect and defend us against all claims that is rising on your Application. No link(s) should appear on any Application that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.


            </IonText>
            </IonItem>
        </IonCardContent>
        </IonCard>
        <IonCard>
        <IonCardHeader>
            <IonCardTitle mode="md">
                Reservation of Rights


            </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
            <IonItem>
            <IonText>
                We reserve the right to request that you remove all links or any particular link to our Application. You approve to immediately remove all links to our Application upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Application, you agree to be bound to and follow these linking terms and conditions.


            </IonText>
            </IonItem>
        </IonCardContent>
        </IonCard>
        <IonCard>
        <IonCardHeader>
            <IonCardTitle mode="md">
                Removal of links from our Application


            </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
            <IonList>
                <IonItem>
                <IonText>
                    If you find any link on our Application that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.


                </IonText>
                </IonItem>
                <IonItem>
                <IonText>
                    We do not ensure that the information on this Application is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the Application remains available or that the material on the Application is kept up to date.



                </IonText>
                </IonItem>
            </IonList>
        </IonCardContent>
        </IonCard>
        <IonCard>
        <IonCardHeader>
            <IonCardTitle mode="md">
                Disclaimer


            </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
            <IonList>
                <IonItem>
                <IonText>
                    If you find any link on our Application that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.


                </IonText>
                </IonItem>
                <IonItem>
                <IonText>
                    We do not ensure that the information on this Application is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the Application remains available or that the material on the Application is kept up to date.



                </IonText>
                </IonItem>
                <IonItem>
                <IonText>
                    To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our Application and the use of this Application. Nothing in this disclaimer will:




                </IonText>
                </IonItem>
                <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    limit or exclude our or your liability for death or personal injury;


                </IonText>
                </IonLabel>


                </IonItem>
                <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    limit or exclude our or your liability for fraud or fraudulent misrepresentation;



                </IonText>
                </IonLabel>


                </IonItem>
                <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    limit any of our or your liabilities in any way that is not permitted under applicable law; or


                </IonText>
                </IonLabel>


                </IonItem>
                <IonItem>
                
                <IonAvatar slot="start">
                    <IonIcon size="large" color="secondary" icon={checkmark}></IonIcon>
                </IonAvatar>
                <IonLabel>
                <IonText className="ion-text-wrap">
                    exclude any of our or your liabilities that may not be excluded under applicable law.



                </IonText>
                </IonLabel>


                </IonItem>
                <IonItem>
                    <IonText>
                    The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.

                    </IonText>
                </IonItem>
                <IonItem>
                    <IonText>
                    As long as the Application and the information and services on the Application are provided free of charge, we will not be liable for any loss or damage of any nature.
                    </IonText>


                </IonItem>
                
            </IonList>
        </IonCardContent>
        </IonCard>
        <IonCard>
        <IonItem>
        <IonCheckbox onClick={ () => setFormData({ ...formData, termsAndConditions: !termsAndConditions }) } slot="start"></IonCheckbox>
        <IonLabel className="ion-text-wrap">
            I accept the terms of use of the digital in online and mobile platform
        </IonLabel>
        </IonItem>
        <IonItem>
            <div className="ion-items-center">
            <IonButton disabled={!(accountType && termsAndConditions)} onClick={() => setStep(3)} type="button" size="default" color="primary">
                Continue
            </IonButton>
            </div>
        </IonItem>
        </IonCard>


      </Fragment>
  );
};

export default withRouter(TermsAndConditions);
