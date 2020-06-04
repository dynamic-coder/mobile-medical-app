import React, {Component, useState, useEffect, useContext} from 'react';
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Modal,
  ScrollView,
  CheckBox,
  View,
  Image,
} from 'react-native';

import {Button, Block, Input, Text} from '../components';
import {theme} from '../constants';
import {Context as AuthContext} from '../context/auth/authContext';
import {NavigationEvents} from 'react-navigation';

const SignUp = ({navigation}) => {
  const {state, signup, clearErrorMessage} = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [roleValue, setRoleValue] = useState(null);

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [checked, setChecked] = useState(false);
  const [msgE, setMSGE] = useState('');
  const role = [
    {id: 0, item: 'utilisateur'},
    {id: 1, item: 'docteur'},
    {id: 2, item: 'infirmièr(e)'},
  ];
  const handleSignUp = () => {
    let myRegex = /^[ ]*([a-zA-Z0-9._-]+)@([-a-zA-Z0-9]+\.+[a-zA-Z]{2,})[ ]*$/;

    const err = [];

    Keyboard.dismiss();

    setLoading(true);
    // check with backend API or with some static data
    if (!email || !myRegex.test(email)) err.push('email');
    if (!name) err.push('name');
    if (!password || password.length < 6) err.push('password');
    // if (!roleValue) err.push('role');

    if (!checked) err.push('terms');

    setErrors(err);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    if (!err.length) {
      signup({
        name,
        email,
        password,
      });

      Alert.alert(
        'Ssuccès!',
        'Votre compte a été créé .\n Remplir vos informations de profile maintenant?',
        [
          {
            text: 'Continue',
            onPress: () => navigation.navigate('SignUpStep1'),
          },
          {
            text: 'plus tard',
            onPress: () => navigation.navigate('Welcome'),
          },
        ],
        {cancelable: false},
      );
    }
  };

  const renderTermsService = () => {
    return (
      <Modal
        animationType="slide"
        visible={showTerms}
        onRequestClose={() => setShowTerms(false)}>
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between">
          <Text h2 light>
            Politique de Confidentialité
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginVertical: theme.sizes.padding}}>
            <Text h4 light height={24} style={{marginBottom: theme.sizes.base}}>
              Données personnelles collectées pour les raisons suivantes et en
              utilisant les services suivants :
            </Text>
            <Text height={24} style={{marginBottom: theme.sizes.base}}>
              1.Autorisations du dispositif pour accéder aux Données
              personnelles :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Autorisation d'accès aux Données biométriques ; Autorisation de la
              localisation approximative (non continue); Autorisation des
              contacts; Autorisation d’accès à la Bibliothèque d’Images.
            </Text>
            <Text height={24} style={{marginBottom: theme.sizes.base}}>
              2.Interactions basées sur la localisation :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Géolocalisation Données personnelles : position géographique.
            </Text>
            <Text height={24} style={{marginBottom: theme.sizes.base}}>
              3.Enregistrement et authentification fournis directement par cette
              Application :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Inscription directe Données personnelles : adresse; adresse
              électronique; code postal; date de naissance; lieu de travail; mot
              de passe; nom de famille; pays; photo de profil; prénom; sexe;
              ville; état.
            </Text>
            <Text h4 light height={24} style={{marginBottom: theme.sizes.base}}>
              Propriétaire et Responsable du traitement :
            </Text>
            <Text height={24} style={{marginBottom: theme.sizes.base}}>
              Types de Données collectées :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Figurent parmi les types de Données personnelles que cette
              Application collecte directement ou en recourant à des tiers :
              prénom; nom de famille; sexe; date de naissance; adresse; adresse
              électronique; mot de passe; pays; état; code postal; ville; photo
              de profil; lieu de travail; position géographique; Autorisation
              des contacts; Autorisation de la localisation approximative (non
              continue); Autorisation d'accès aux Données biométriques ;
              Autorisation d’accès à la Bibliothèque d’Images. Les détails
              complets sur chaque type de Données personnelles collectées sont
              fournis dans les parties consacrées à la présente politique de
              confidentialité ou par des textes d’explication spécifiques
              publiés avant la collecte des Données. Les Données personnelles
              peuvent être librement fournies par l’Utilisateur, ou, en cas de
              Données d’utilisation, collectées automatiquement lorsque vous
              utilisez this-medical-app. Sauf indication contraire, toutes les
              Données demandées par this-medical-app sont obligatoires et leur
              absence peut rendre impossible la fourniture des Services par
              this-medical-app. Dans le cas où this-medical-app précise que
              certaines Données ne sont pas obligatoires, les Utilisateurs sont
              libres de ne pas les communiquer sans entraîner de conséquences
              sur la disponibilité ou le fonctionnement du Service. Les
              Utilisateurs qui auraient des doutes sur les Données personnelles
              obligatoires sont invités à contacter le Propriétaire. Toute
              utilisation des Cookies – ou d’autres outils de suivi – par cette
              Application ou par les propriétaires de services tiers utilisés
              par this-medical-app vise à fournir le Service demandé par
              l’Utilisateur, outre les autres finalités décrites dans le présent
              document et dans la Politique relative aux cookies, si elle est
              disponible. Les Utilisateurs sont responsables de toute Donnée
              personnelle de tiers obtenue, publiée ou communiquée par
              l’intermédiaire de this-medical-app et confirment qu’ils
              obtiennent le consentement du tiers pour fournir les Données au
              Propriétaire.
            </Text>
            <Text height={24} style={{marginBottom: theme.sizes.base}}>
              Mode et lieu de traitement des Données :
            </Text>
            <Text
              caption
              bold
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Mode et lieu de traitement des Données :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Le Propriétaire prend les mesures de sécurité appropriées afin
              d’empêcher l’accès, la divulgation, la modification ou la
              destruction non autorisés des Données. Le traitement des Données
              est effectué à l’aide d’ordinateurs ou d’outils informatiques, en
              suivant les procédures et les modes organisationnels étroitement
              liés aux finalités indiquées. Outre le Propriétaire, les Données
              peuvent être accessibles, dans certains cas, à certaines
              catégories de personnes en charge du fonctionnement de cette
              Application (administration, ventes, marketing, service juridique,
              administration du système) ou à des parties externes (telles que
              les fournisseurs tiers de services techniques, les services de
              messagerie, les fournisseurs d’hébergement, les entreprises
              informatiques, les agences de communication) désignées, le cas
              échéant, comme Sous-traitantes par le Propriétaire. La liste mise
              à jour de ces parties peut être demandée à tout moment au
              Propriétaire.
            </Text>
            <Text
              caption
              bold
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Base juridique du traitement :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Le Propriétaire peut traiter les Données personnelles relatives
              aux Utilisateurs si l'une des conditions suivantes s’applique : **
              les Utilisateurs ont donné leur consentement pour une ou plusieurs
              finalités spécifiques ; A noter : Selon certaines législations, le
              Propriétaire peut être autorisé à traiter des Données personnelles
              jusqu'à ce que l'Utilisateur s'y oppose (« opt-out »), sans avoir
              à dépendre du consentement ou de l'une des bases juridiques
              suivantes. Cette condition ne s'applique toutefois pas lorsque le
              traitement des Données personnelles est soumis à la loi européenne
              sur la protection des données ; ** la fourniture de Données est
              nécessaire pour l'exécution d'un accord avec l'Utilisateur ou pour
              toute obligation précontractuelle de celui-ci ; ** le traitement
              est nécessaire pour se conformer à une obligation légale à
              laquelle le Propriétaire est soumis ; ** le traitement est lié à
              une tâche effectuée dans l'intérêt public ou dans l'exercice de
              l'autorité publique dévolue au Propriétaire ; ** le traitement est
              nécessaire aux fins des intérêts légitimes poursuivis par le
              Propriétaire ou par un tiers. Dans tous les cas, le Propriétaire
              vous aidera volontiers à clarifier la base juridique spécifique
              qui s'applique au traitement, et en particulier si la fourniture
              de Données personnelles est une exigence légale ou contractuelle,
              ou une exigence nécessaire pour conclure un contrat.
            </Text>
            <Text
              caption
              bold
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Lieu de traitement :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Les Données sont traitées au siège du Propriétaire et dans tous
              les autres lieux où sont situées les parties responsables du
              traitement. Selon la localisation de l’Utilisateur, les transferts
              de données peuvent entraîner le transfert des Données de ce
              dernier vers un pays autre que le sien. Pour en savoir plus sur le
              lieu de traitement de ces Données transférées, les Utilisateurs
              peuvent consulter la section qui contient des détails sur le
              traitement des Données personnelles. Les Utilisateurs ont
              également le droit de connaître la base juridique des transferts
              de Données vers un pays situé en dehors de l'Union européenne ou
              vers toute organisation internationale régie par le droit
              international public ou créée par deux pays ou plus, comme l'ONU,
              ainsi que les mesures de sécurité prises par le Propriétaire pour
              sauvegarder leurs Données. Si un tel transfert a lieu, les
              Utilisateurs peuvent en savoir plus en consultant les sections
              correspondantes du présent document ou se renseigner auprès du
              Propriétaire en utilisant les informations fournies dans la
              section de contact.
            </Text>
            <Text
              caption
              bold
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Temps de conservation :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Les Données personnelles sont traitées et conservées aussi
              longtemps que requis pour la finalité pour laquelle elles ont été
              collectées. Par conséquent : ** Les Données personnelles
              collectées à des fins liées à l'exécution d'un contrat entre le
              Propriétaire et l'Utilisateur doivent être conservées jusqu'à la
              pleine exécution du contrat. ** Les Données personnelles
              collectées aux fins des intérêts légitimes du Propriétaire doivent
              être conservées aussi longtemps que nécessaire pour atteindre ces
              objectifs. Les Utilisateurs peuvent trouver des informations
              spécifiques concernant les intérêts légitimes poursuivis par le
              Propriétaire dans les sections correspondantes du présent document
              ou en contactant le Propriétaire. * Le Propriétaire peut être
              autorisé à conserver des Données personnelles plus longtemps
              chaque fois que l’Utilisateur a donné son consentement à un tel
              traitement, tant que ce consentement n’est pas retiré. En outre,
              le Propriétaire peut être obligé de conserver des Données
              personnelles plus longtemps chaque fois que cela est requis pour
              l'exécution d'une obligation légale ou sur ordre d'une autorité. *
              Une fois la période de conservation expirée, les Données
              personnelles seront supprimées. Par conséquent, le droit d'accès,
              le droit d'effacement, le droit de rectification et le droit à la
              portabilité des données ne peuvent être appliqués après
              l'expiration de la période de conservation.
            </Text>
            <Text height={24} style={{marginBottom: theme.sizes.base}}>
              Finalités du traitement :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Les Données relatives à l’Utilisateur sont collectées afin de
              permettre au Propriétaire de fournir son Service, de remplir ses
              obligations, de répondre aux demandes d’application de la loi, de
              protéger ses droits et intérêts (ou ceux de ses Utilisateurs ou de
              tiers), de détecter toute activité malveillante ou frauduleuse,
              ainsi que ce qui suit : Enregistrement et authentification fournis
              directement par this-medical-app, Interactions basées sur la
              localisation et Autorisations du dispositif pour accéder aux
              Données personnelles. Pour obtenir des informations précises sur
              les Données personnelles utilisées pour chaque finalité,
              l’Utilisateur peut consulter la partie « Plus d'informations sur
              le traitement des Données personnelles ».
            </Text>
            <Text height={24} style={{marginBottom: theme.sizes.base}}>
              Autorisations du dispositif pour accéder aux Données personnelles
              :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Selon le dispositif particulier de l'Utilisateur, cette
              Application pourrait demander certaines autorisations pour lui
              autoriser l'accès aux Données du dispositif de l'Utilisateur comme
              décrit ci-dessous. Par défaut, ces autorisations doivent être
              accordées par l’Utilisateur avant que les informations respectives
              soient accessibles. Une fois que l’autorisation a été donnée, elle
              peut être révoquée par l’Utilisateur à tout moment. Afin de
              révoquer ces autorisations, les Utilisateurs peuvent consulter les
              paramètres du dispositif ou contacter le Propriétaire aux
              coordonnées fournies dans le présent document. La procédure exacte
              pour contrôler les permissions des applications peut dépendre du
              dispositif et du logiciel de l’Utilisateur. Veuillez noter que la
              révocation de ces autorisations peut affecter le bon
              fonctionnement de this-medical-app. Si l’Utilisateur accorde l’une
              des autorisations répertoriées ci-dessous, ces Données
              personnelles respectives peuvent être traitées (c’est-à-dire
              accessibles, modifiées ou supprimées) par this-medical-app.
            </Text>
            <Text
              caption
              bold
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Autorisation d'accès aux Données biométriques :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Utilisée pour accéder aux Données biométriques de l’Utilisateur ou
              à des systèmes d’authentification, comme par exemple, FaceID.
            </Text>
            <Text
              caption
              bold
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Autorisation de la localisation approximative (non continue) :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Utilisée pour accéder à la localisation approximative du
              dispositif de l’Utilisateur. this-medical-app peut collecter,
              utiliser et partager les Données de localisation de l’Utilisateur
              aux fins de fournir des services basés sur la localisation. La
              localisation géographique de l’Utilisateur est déterminée de façon
              non continue. Cela signifie qu’il est impossible pour cette
              Application d’obtenir la position approximative de l’Utilisateur
              de façon continue.
            </Text>
            <Text
              caption
              bold
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Autorisation des contacts :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Utilisée pour accéder aux contacts et aux profils sur le
              dispositif de l’Utilisateur, notamment la modification des
              entrées.
            </Text>
            <Text
              caption
              bold
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Autorisation d’accès à la Bibliothèque d’Images :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Permet d’accéder à la Bibliothèque d’Images de l’Utilisateur.
            </Text>
            <Text height={24} style={{marginBottom: theme.sizes.base}}>
              Informations détaillées sur le traitement des Données personnelles
              :
            </Text>
            <Text
              caption
              bold
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              1.Autorisations du dispositif pour accéder aux Données
              personnelles :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              this-medical-app nécessite certaines autorisations des
              Utilisateurs qui lui permettent d’accéder aux Données du
              dispositif des Utilisateurs, présentées ci-après. " Autorisations
              du dispositif pour accéder aux Données personnelles
              (this-medical-app) " this-medical-app nécessite certaines
              autorisations des Utilisateurs qui lui permettent d’accéder aux
              Données du dispositif des Utilisateurs, présentées dans le présent
              document. Données personnelles traitées : Autorisation d'accès aux
              Données biométriques ; Autorisation de la localisation
              approximative (non continue); Autorisation des contacts;
              Autorisation d’accès à la Bibliothèque d’Images.
            </Text>
            <Text
              caption
              bold
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              2.Interactions basées sur la localisation :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Géolocalisation (this-medical-app) this-medical-app peut
              collecter, utiliser et partager les Données de localisation de
              l’Utilisateur aux fins de fournir des services basés sur la
              localisation. La plupart des navigateurs et dispositifs
              fournissent des outils permettant de se retirer de cette fonction
              par défaut. Si une autorisation explicite a été accordée, les
              données de localisation de l’Utilisateur peuvent être suivies par
              this-medical-app. Données personnelles traitées : position
              géographique.
            </Text>
            <Text
              caption
              bold
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              3.Enregistrement et authentification fournis directement par cette
              Application :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              L’inscription ou l’authentification de l’Utilisateur autorise
              this-medical-app à l’identifier et lui donne accès à des services
              dédiés. Les Données Personnelles sont collectées et stockées à des
              fins d’enregistrement ou d’identification seulement. Les Données
              collectées sont uniquement celles nécessaires à la prestation du
              service demandé par les Utilisateurs. " Inscription directe
              (this-medical-app) " L’Utilisateur s’inscrit en remplissant le
              formulaire d’inscription et en fournissant ses Données
              Personnelles directement à this-medical-app. Données personnelles
              traitées : adresse; adresse électronique; code postal; date de
              naissance; lieu de travail; mot de passe; nom de famille; pays;
              photo de profil; prénom; sexe; ville; état.
            </Text>
            <Text height={24} style={{marginBottom: theme.sizes.base}}>
              Droits des Utilisateurs :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Les Utilisateurs peuvent exercer certains droits concernant leurs
              Données traitées par le Propriétaire. En particulier, les
              Utilisateurs ont le droit de faire ce qui suit :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              * Retirer leur consentement à tout moment. Les Utilisateurs ont le
              droit de retirer leur consentement s'ils ont déjà donné leur
              consentement au traitement de leurs Données personnelles.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              * S'opposer au traitement de leurs Données. Les Utilisateurs ont
              le droit de s'opposer au traitement de leurs Données si le
              traitement est effectué sur une base juridique autre que le
              consentement. Des précisions sont ajoutées dans la section
              correspondante ci-dessous.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              * Accéder à leurs Données. Les Utilisateurs ont le droit de savoir
              si les Données sont traitées par le Propriétaire, d'obtenir des
              informations sur certains aspects du traitement et d'obtenir une
              copie des Données en cours de traitement.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              * Vérifier et obtenir une rectification. Les Utilisateurs ont le
              droit de vérifier l'exactitude de leurs Données et de demander
              qu'elles soient mises à jour ou corrigées.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              * Limiter le traitement de leurs Données. Les Utilisateurs ont le
              droit, sous certaines conditions, de limiter le traitement de
              leurs Données. Dans ce cas, le Propriétaire traitera leurs Données
              uniquement pour les stocker.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              * Faire supprimer ou effacer leurs Données personnelles. Les
              Utilisateurs ont le droit, sous certaines conditions, d'obtenir
              l'effacement de leurs Données auprès du Propriétaire.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              * Récupérer leurs Données et les transférer à un autre responsable
              du traitement. Les Utilisateurs ont le droit de récupérer leurs
              Données dans un format structuré, couramment utilisé et lisible
              par machine et, si cela est techniquement possible, de les
              transmettre à un autre responsable du traitement sans obstacle
              d'aucune sorte. Cette disposition s’applique, sous réserve que les
              Données soient traitées par des moyens automatisés et que le
              traitement repose sur le consentement de l'Utilisateur, sur un
              contrat auquel l'Utilisateur est partie ou sur des obligations
              précontractuelles.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              * Déposer plainte. Les Utilisateurs ont le droit de déposer une
              plainte auprès de leur autorité compétente en matière de
              protection des données.
            </Text>
            <Text
              caption
              bold
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Informations concernant le droit d'opposition au traitement :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Lorsque les Données personnelles sont traitées dans l'intérêt
              public, dans l'exercice d'une autorité officielle dévolue au
              Propriétaire ou aux fins des intérêts légitimes poursuivis par
              celui-ci, les Utilisateurs peuvent s'opposer à ce traitement en
              fournissant un motif lié à leur situation particulière devant
              justifier cette opposition.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Les Utilisateurs doivent cependant savoir que si leurs Données
              personnelles sont traitées à des fins de marketing direct, ils
              peuvent s'opposer à ce traitement à tout moment sans aucune
              justification. Pour savoir si le Propriétaire traite des Données
              personnelles à des fins de marketing direct, les Utilisateurs
              peuvent se reporter aux sections correspondantes du présent
              document.
            </Text>
            <Text
              caption
              bold
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Comment exercer ces droits :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Toute demande d'exercice des droits de l'Utilisateur peut être
              adressée au Propriétaire grâce aux coordonnées fournies dans le
              présent document. Ces demandes peuvent être exercées gratuitement
              et seront étudiées par le Propriétaire le plus tôt possible et
              toujours dans un délai d'un mois.
            </Text>
            <Text height={24} style={{marginBottom: theme.sizes.base}}>
              Informations supplémentaires sur le traitement et la collecte des
              Données :
            </Text>
            <Text
              caption
              bold
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Action en justice :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Les Données personnelles de l’Utilisateur peuvent être utilisées à
              des fins juridiques par le Propriétaire devant les tribunaux ou
              dans les étapes pouvant conduire à une action en justice résultant
              d’une utilisation inappropriée de this-medical-app ou des Services
              connexes.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              L’Utilisateur est conscient du fait que le Propriétaire peut être
              amené à révéler des Données personnelles à la demande des
              autorités publiques.
            </Text>
            <Text
              caption
              bold
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Informations supplémentaires concernant les Données personnelles
              de l’Utilisateur :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Outre les informations contenues dans la présente politique de
              confidentialité, this-medical-app peut fournir à l’Utilisateur des
              renseignements complémentaires et des informations contextuelles
              concernant des services particuliers ou la collecte et le
              traitement des Données personnelles.
            </Text>
            <Text
              caption
              bold
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Journaux système et maintenance :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              À des fins d'exploitation et de maintenance, this-medical-app et
              tout service tiers peuvent collecter des fichiers qui enregistrent
              les interactions avec this-medical-app (journaux système) ou
              utiliser à cette fin d'autres Données personnelles (telles que
              l'adresse IP).
            </Text>
            <Text
              caption
              bold
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Informations non incluses dans la présente politique :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              De plus amples renseignements concernant la collecte ou le
              traitement des Données personnelles peuvent à tout moment être
              demandés au Propriétaire. Veuillez consulter les coordonnées
              figurant au début du présent document.
            </Text>
            <Text
              caption
              bold
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Comment les demandes « Ne pas pister » sont traitées :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              this-medical-app ne prend pas en charge les demandes « Ne pas
              pister ». Référez-vous à la politique de confidentialité des
              services tiers pour déterminer s’ils acceptent ou non aux demandes
              « Ne pas pister ».
            </Text>
            <Text
              caption
              bold
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Modifications de la présente politique de confidentialité :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Le Propriétaire se réserve le droit d'apporter des modifications à
              la présente politique de confidentialité, à tout moment, en
              informant ses Utilisateurs sur cette page et éventuellement dans
              cette this-medical-app ou – pour autant que cela soit
              techniquement et légalement possible – en envoyant une
              notification aux Utilisateurs par l'intermédiaire des coordonnées
              disponibles pour le Propriétaire. Il est fortement recommandé de
              consulter cette page fréquemment, en se référant à la date de la
              dernière modification indiquée en bas.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Si les modifications influencent les activités de traitement
              effectuées sur la base du consentement de l'Utilisateur, le
              Propriétaire doit recueillir un nouveau consentement de
              l'Utilisateur lorsque nécessaire.
            </Text>
            <Text height={24} style={{marginBottom: theme.sizes.base}}>
              Définitions et références légales :
            </Text>
            <Text
              caption
              bold
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Données personnelles (ou Données) :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Toute information qui, directement, indirectement ou en relation
              avec d'autres informations – y compris un numéro d'identification
              personnel – permet l'identification ou l'identifiabilité d'une
              personne physique.
            </Text>
            <Text
              caption
              bold
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Données d’utilisation :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Les informations collectées automatiquement par this-medical-app
              (ou par des services tiers employés par this-medical-app), qui
              peuvent inclure les adresses IP ou les noms de domaines des
              ordinateurs utilisés par les Utilisateurs qui utilisent cette
              Application, les adresses URI (Uniform Resource Identifier ou
              identifiant uniforme de ressource), l’heure de la demande, la
              méthode utilisée pour soumettre la demande au serveur, la taille
              du fichier reçu en réponse, le code numérique indiquant le statut
              de la réponse du serveur (résultat favorable, erreur, etc.), le
              pays d’origine, les caractéristiques du navigateur et du système
              d’exploitation utilisés par l’Utilisateur, les différents détails
              relatifs au temps par visite (p. ex. temps passé sur chaque page
              dans l’Application) et les détails relatifs au chemin suivi dans
              l’Application avec une référence spéciale à la séquence des pages
              visitées, et d’autres paramètres concernant le système
              d’exploitation ou l’environnement informatique de l’Utilisateur.
            </Text>
            <Text
              caption
              bold
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Utilisateur :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              La personne utilisant this-medical-app qui, sauf indication
              contraire, correspond à la Personne concernée.
            </Text>
            <Text
              caption
              bold
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Personne concernée :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              La personne physique à laquelle les Données personnelles font
              référence.
            </Text>
            <Text
              caption
              bold
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Sous-traitant (ou Responsable des données) :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              La personne physique ou morale, l'autorité publique, l'institution
              ou tout autre organisme qui traite les Données personnelles pour
              le compte du Responsable du traitement, tel que décrit dans la
              présente politique de confidentialité.
            </Text>
            <Text
              caption
              bold
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Responsable du traitement (ou Propriétaire) :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              La personne physique ou morale, l’autorité publique, l'institution
              ou toute autre organisme qui, seul ou conjointement avec d’autres,
              détermine les finalités et les moyens du traitement de Données
              personnelles, y compris les mesures de sécurité concernant le
              fonctionnement et l'utilisation de this-medical-app. Sauf mention
              contraire, le Responsable du traitement est le Propriétaire de
              this-medical-app.
            </Text>
            <Text
              caption
              bold
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              this-medical-app :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Les moyens par lesquels les Données personnelles de l'Utilisateur
              sont collectées et traitées.
            </Text>
            <Text
              caption
              bold
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Service :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Le service fourni par this-medical-app comme décrit dans les
              conditions s'y rapportant (le cas échéant) et sur cette
              application.
            </Text>
            <Text
              caption
              bold
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Informations légales :
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              La présente politique de confidentialité a été préparée en
              exécution des dispositions de plusieurs législations, notamment de
              l'article 13/14 du règlement européen 2016/679 (règlement général
              sur la protection des données).
            </Text>

            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              Cette politique de confidentialité concerne uniquement
              this-medical-app, sauf indication contraire dans le présent
              document.
            </Text>
          </ScrollView>

          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button gradient onPress={() => setShowTerms(false)}>
              <Text center white>
                j'ai compris
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  };
  const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

  return (
    <Block>
      <NavigationEvents onWillBlur={clearErrorMessage} />

      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <ScrollView>
          <Block padding={[0, theme.sizes.base * 2]}>
            <View
              style={{
                paddingBottom: theme.sizes.base * 1,
                paddingTop: theme.sizes.base * 1,
                alignItems: 'center',
              }}>
              <Image
                style={{width: 130, height: 130, justifyContent: 'center'}}
                source={require('../../assets/icon.png')}
              />
            </View>
            <Block middle>
              <Input
                email
                label="Email"
                error={hasErrors('email')}
                style={[styles.input, hasErrors('email')]}
                autoCapitalize="none"
                autoCorrect={false}
                defaultValue={email}
                onChangeText={text => setEmail(text.replace(/ /g, ''))}
              />
              <Input
                label="Nom et Prénom"
                error={hasErrors('name')}
                style={[styles.input, hasErrors('name')]}
                defaultValue={name}
                onChangeText={setName}
              />
              <Input
                secure
                label="Mot de passe"
                error={hasErrors('password')}
                style={[styles.input, hasErrors('password')]}
                defaultValue={password}
                onChangeText={setPassword}
              />

              {/* <SelectBox
                label='Rôle'
                inputPlaceholder='select'
                options={role}
                error={hasErrors('role')}
                value={roleValue}
                onChange={val => setRoleValue(val)}
                hideInputFilter={true}
                viewMargin='0 0 20px 0'
                style={hasErrors('role')}
              /> */}

              <Block
                right
                center
                // justify='space-between'
                style={{flexDirection: 'row'}}>
                <CheckBox
                  color="white"
                  value={checked}
                  onValueChange={() => setChecked(!checked)}
                  checked="red"
                />

                <Button onPress={() => setShowTerms(true)}>
                  <Text
                    center
                    caption
                    gray
                    style={{textDecorationLine: 'underline'}}>
                    conditions d'utilisation
                  </Text>
                </Button>
              </Block>
              {state.errorMessage ? (
                <Text color="red">{state.errorMessage}</Text>
              ) : null}
              <Text caption color="red" style={{marginLeft: 10}}>
                {hasErrors('email')
                  ? "adresse e-mail n'est pas valide"
                  : hasErrors('name')
                  ? 'entrer votre nom et prénom'
                  : hasErrors('password')
                  ? 'entrer un mot de passe (min 6 caractère)'
                  : hasErrors('role')
                  ? 'choisir un rôle'
                  : hasErrors('terms')
                  ? "accépter notre condition d'utilisation"
                  : null}
              </Text>

              <Button
                gradient
                onPress={() => {
                  handleSignUp();
                }}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Inscrir
                  </Text>
                )}
              </Button>

              <Button onPress={() => navigation.navigate('Login')}>
                <Text
                  gray
                  caption
                  center
                  style={{textDecorationLine: 'underline'}}>
                  retour à l'identification
                </Text>
              </Button>
            </Block>
          </Block>
        </ScrollView>
      </KeyboardAvoidingView>
      {renderTermsService()}
    </Block>
  );
};
export default SignUp;
const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});
