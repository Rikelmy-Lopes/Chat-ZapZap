import axios from 'axios';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import socketContext from '../../Context/SocketContext';
import { IUser } from '../../Interface/Interfaces';
import { validateToken } from '../../Utils/Auth';
import './NewChat.css';


function NewChat() {
  const history = useNavigate();
  const socket = useContext(socketContext);
  const [ toPhoneNumber, setToPhoneNumber ] = useState<string>('');
  const [ errorExist, setErrorExist ] = useState<boolean>(false);
  const [ selectedCode, setSelectedCode ] = useState<string>('55');

  const removeErrorMessage = (): void => {
    setTimeout(() => {
      setErrorExist(false);
    }, 2500);
  };

  const displayErrorMessage = (): ReactElement | undefined => {
    if (!errorExist) return;
    removeErrorMessage();
    return (
      <p 
        className='error-message'
        style={ { display: 'inline-block' }}
      >
          Número de Telefone não Encontrado!
      </p>
    );
  };

  const verifyIfNumberExist = async (): Promise<boolean> => {
    const host = import.meta.env.VITE_BACKEND_HOST;
    const { token }: IUser = JSON.parse(String(localStorage.getItem('user')));
    try {
      const data = await axios.get(`${host}/user/+${selectedCode}${toPhoneNumber}`, {
        headers: {
          Authorization: token
        }
      });
      console.log(data)
      return true;
    } catch (error) {
      console.log(error);
      setErrorExist(true);
      return false;
    }
  };

  const newChat = async () => {
    if (!(await verifyIfNumberExist())) return;
    const { phoneNumber }: IUser = JSON.parse(String(localStorage.getItem('user')));
    socket?.emit('new-chat', { 
      toPhoneNumber: `+${selectedCode}${toPhoneNumber}`, 
      fromPhoneNumber: phoneNumber 
    });
    socket?.once('get-hashRoomId', () => {
      history('/chats');
    });
  };

  useEffect(() =>{
    validateToken(history);
  }, []);

  return(
    <div id='main-container'>
      <Header />
      <div id='contact-container'>
        <div id='add-contact-container'>
          <select 
            name="countryCode" 
            id=""
            onChange={({ target }) => setSelectedCode(target.value)}
          >
            <option data-country-code="BR" value="55">Brazil (+55)</option>
            <option data-country-code="US" value="1">USA (+1)</option>
            <optgroup label="Other countries">
              <option data-country-code="DZ" value="213">Algeria (+213)</option>
              <option data-country-code="AD" value="376">Andorra (+376)</option>
              <option data-country-code="AO" value="244">Angola (+244)</option>
              <option data-country-code="AI" value="1264">Anguilla (+1264)</option>
              <option data-country-code="AG" value="1268">Antigua &amp; Barbuda (+1268)</option>
              <option data-country-code="AR" value="54">Argentina (+54)</option>
              <option data-country-code="AM" value="374">Armenia (+374)</option>
              <option data-country-code="AW" value="297">Aruba (+297)</option>
              <option data-country-code="AU" value="61">Australia (+61)</option>
              <option data-country-code="AT" value="43">Austria (+43)</option>
              <option data-country-code="AZ" value="994">Azerbaijan (+994)</option>
              <option data-country-code="BS" value="1242">Bahamas (+1242)</option>
              <option data-country-code="BH" value="973">Bahrain (+973)</option>
              <option data-country-code="BD" value="880">Bangladesh (+880)</option>
              <option data-country-code="BB" value="1246">Barbados (+1246)</option>
              <option data-country-code="BY" value="375">Belarus (+375)</option>
              <option data-country-code="BE" value="32">Belgium (+32)</option>
              <option data-country-code="BZ" value="501">Belize (+501)</option>
              <option data-country-code="BJ" value="229">Benin (+229)</option>
              <option data-country-code="BM" value="1441">Bermuda (+1441)</option>
              <option data-country-code="BT" value="975">Bhutan (+975)</option>
              <option data-country-code="BO" value="591">Bolivia (+591)</option>
              <option data-country-code="BA" value="387">Bosnia Herzegovina (+387)</option>
              <option data-country-code="BW" value="267">Botswana (+267)</option>
              <option data-country-code="BR" value="55">Brazil (+55)</option>
              <option data-country-code="BN" value="673">Brunei (+673)</option>
              <option data-country-code="BG" value="359">Bulgaria (+359)</option>
              <option data-country-code="BF" value="226">Burkina Faso (+226)</option>
              <option data-country-code="BI" value="257">Burundi (+257)</option>
              <option data-country-code="KH" value="855">Cambodia (+855)</option>
              <option data-country-code="CM" value="237">Cameroon (+237)</option>
              <option data-country-code="CA" value="1">Canada (+1)</option>
              <option data-country-code="CV" value="238">Cape Verde Islands (+238)</option>
              <option data-country-code="KY" value="1345">Cayman Islands (+1345)</option>
              <option data-country-code="CF" value="236">Central African Republic (+236)</option>
              <option data-country-code="CL" value="56">Chile (+56)</option>
              <option data-country-code="CN" value="86">China (+86)</option>
              <option data-country-code="CO" value="57">Colombia (+57)</option>
              <option data-country-code="KM" value="269">Comoros (+269)</option>
              <option data-country-code="CG" value="242">Congo (+242)</option>
              <option data-country-code="CK" value="682">Cook Islands (+682)</option>
              <option data-country-code="CR" value="506">Costa Rica (+506)</option>
              <option data-country-code="HR" value="385">Croatia (+385)</option>
              <option data-country-code="CU" value="53">Cuba (+53)</option>
              <option data-country-code="CY" value="90392">Cyprus North (+90392)</option>
              <option data-country-code="CY" value="357">Cyprus South (+357)</option>
              <option data-country-code="CZ" value="42">Czech Republic (+42)</option>
              <option data-country-code="DK" value="45">Denmark (+45)</option>
              <option data-country-code="DJ" value="253">Djibouti (+253)</option>
              <option data-country-code="DM" value="1809">Dominica (+1809)</option>
              <option data-country-code="DO" value="1809">Dominican Republic (+1809)</option>
              <option data-country-code="EC" value="593">Ecuador (+593)</option>
              <option data-country-code="EG" value="20">Egypt (+20)</option>
              <option data-country-code="SV" value="503">El Salvador (+503)</option>
              <option data-country-code="GQ" value="240">Equatorial Guinea (+240)</option>
              <option data-country-code="ER" value="291">Eritrea (+291)</option>
              <option data-country-code="EE" value="372">Estonia (+372)</option>
              <option data-country-code="ET" value="251">Ethiopia (+251)</option>
              <option data-country-code="FK" value="500">Falkland Islands (+500)</option>
              <option data-country-code="FO" value="298">Faroe Islands (+298)</option>
              <option data-country-code="FJ" value="679">Fiji (+679)</option>
              <option data-country-code="FI" value="358">Finland (+358)</option>
              <option data-country-code="FR" value="33">France (+33)</option>
              <option data-country-code="GF" value="594">French Guiana (+594)</option>
              <option data-country-code="PF" value="689">French Polynesia (+689)</option>
              <option data-country-code="GA" value="241">Gabon (+241)</option>
              <option data-country-code="GM" value="220">Gambia (+220)</option>
              <option data-country-code="GE" value="7880">Georgia (+7880)</option>
              <option data-country-code="DE" value="49">Germany (+49)</option>
              <option data-country-code="GH" value="233">Ghana (+233)</option>
              <option data-country-code="GI" value="350">Gibraltar (+350)</option>
              <option data-country-code="GR" value="30">Greece (+30)</option>
              <option data-country-code="GL" value="299">Greenland (+299)</option>
              <option data-country-code="GD" value="1473">Grenada (+1473)</option>
              <option data-country-code="GP" value="590">Guadeloupe (+590)</option>
              <option data-country-code="GU" value="671">Guam (+671)</option>
              <option data-country-code="GT" value="502">Guatemala (+502)</option>
              <option data-country-code="GN" value="224">Guinea (+224)</option>
              <option data-country-code="GW" value="245">Guinea - Bissau (+245)</option>
              <option data-country-code="GY" value="592">Guyana (+592)</option>
              <option data-country-code="HT" value="509">Haiti (+509)</option>
              <option data-country-code="HN" value="504">Honduras (+504)</option>
              <option data-country-code="HK" value="852">Hong Kong (+852)</option>
              <option data-country-code="HU" value="36">Hungary (+36)</option>
              <option data-country-code="IS" value="354">Iceland (+354)</option>
              <option data-country-code="IN" value="91">India (+91)</option>
              <option data-country-code="ID" value="62">Indonesia (+62)</option>
              <option data-country-code="IR" value="98">Iran (+98)</option>
              <option data-country-code="IQ" value="964">Iraq (+964)</option>
              <option data-country-code="IE" value="353">Ireland (+353)</option>
              <option data-country-code="IL" value="972">Israel (+972)</option>
              <option data-country-code="IT" value="39">Italy (+39)</option>
              <option data-country-code="JM" value="1876">Jamaica (+1876)</option>
              <option data-country-code="JP" value="81">Japan (+81)</option>
              <option data-country-code="JO" value="962">Jordan (+962)</option>
              <option data-country-code="KZ" value="7">Kazakhstan (+7)</option>
              <option data-country-code="KE" value="254">Kenya (+254)</option>
              <option data-country-code="KI" value="686">Kiribati (+686)</option>
              <option data-country-code="KP" value="850">Korea North (+850)</option>
              <option data-country-code="KR" value="82">Korea South (+82)</option>
              <option data-country-code="KW" value="965">Kuwait (+965)</option>
              <option data-country-code="KG" value="996">Kyrgyzstan (+996)</option>
              <option data-country-code="LA" value="856">Laos (+856)</option>
              <option data-country-code="LV" value="371">Latvia (+371)</option>
              <option data-country-code="LB" value="961">Lebanon (+961)</option>
              <option data-country-code="LS" value="266">Lesotho (+266)</option>
              <option data-country-code="LR" value="231">Liberia (+231)</option>
              <option data-country-code="LY" value="218">Libya (+218)</option>
              <option data-country-code="LI" value="417">Liechtenstein (+417)</option>
              <option data-country-code="LT" value="370">Lithuania (+370)</option>
              <option data-country-code="LU" value="352">Luxembourg (+352)</option>
              <option data-country-code="MO" value="853">Macao (+853)</option>
              <option data-country-code="MK" value="389">Macedonia (+389)</option>
              <option data-country-code="MG" value="261">Madagascar (+261)</option>
              <option data-country-code="MW" value="265">Malawi (+265)</option>
              <option data-country-code="MY" value="60">Malaysia (+60)</option>
              <option data-country-code="MV" value="960">Maldives (+960)</option>
              <option data-country-code="ML" value="223">Mali (+223)</option>
              <option data-country-code="MT" value="356">Malta (+356)</option>
              <option data-country-code="MH" value="692">Marshall Islands (+692)</option>
              <option data-country-code="MQ" value="596">Martinique (+596)</option>
              <option data-country-code="MR" value="222">Mauritania (+222)</option>
              <option data-country-code="YT" value="269">Mayotte (+269)</option>
              <option data-country-code="MX" value="52">Mexico (+52)</option>
              <option data-country-code="FM" value="691">Micronesia (+691)</option>
              <option data-country-code="MD" value="373">Moldova (+373)</option>
              <option data-country-code="MC" value="377">Monaco (+377)</option>
              <option data-country-code="MN" value="976">Mongolia (+976)</option>
              <option data-country-code="MS" value="1664">Montserrat (+1664)</option>
              <option data-country-code="MA" value="212">Morocco (+212)</option>
              <option data-country-code="MZ" value="258">Mozambique (+258)</option>
              <option data-country-code="MN" value="95">Myanmar (+95)</option>
              <option data-country-code="NA" value="264">Namibia (+264)</option>
              <option data-country-code="NR" value="674">Nauru (+674)</option>
              <option data-country-code="NP" value="977">Nepal (+977)</option>
              <option data-country-code="NL" value="31">Netherlands (+31)</option>
              <option data-country-code="NC" value="687">New Caledonia (+687)</option>
              <option data-country-code="NZ" value="64">New Zealand (+64)</option>
              <option data-country-code="NI" value="505">Nicaragua (+505)</option>
              <option data-country-code="NE" value="227">Niger (+227)</option>
              <option data-country-code="NG" value="234">Nigeria (+234)</option>
              <option data-country-code="NU" value="683">Niue (+683)</option>
              <option data-country-code="NF" value="672">Norfolk Islands (+672)</option>
              <option data-country-code="NP" value="670">Northern Marianas (+670)</option>
              <option data-country-code="NO" value="47">Norway (+47)</option>
              <option data-country-code="OM" value="968">Oman (+968)</option>
              <option data-country-code="PW" value="680">Palau (+680)</option>
              <option data-country-code="PA" value="507">Panama (+507)</option>
              <option data-country-code="PG" value="675">Papua New Guinea (+675)</option>
              <option data-country-code="PY" value="595">Paraguay (+595)</option>
              <option data-country-code="PE" value="51">Peru (+51)</option>
              <option data-country-code="PH" value="63">Philippines (+63)</option>
              <option data-country-code="PL" value="48">Poland (+48)</option>
              <option data-country-code="PT" value="351">Portugal (+351)</option>
              <option data-country-code="PR" value="1787">Puerto Rico (+1787)</option>
              <option data-country-code="QA" value="974">Qatar (+974)</option>
              <option data-country-code="RE" value="262">Reunion (+262)</option>
              <option data-country-code="RO" value="40">Romania (+40)</option>
              <option data-country-code="RU" value="7">Russia (+7)</option>
              <option data-country-code="RW" value="250">Rwanda (+250)</option>
              <option data-country-code="SM" value="378">San Marino (+378)</option>
              <option data-country-code="ST" value="239">Sao Tome &amp; Principe (+239)</option>
              <option data-country-code="SA" value="966">Saudi Arabia (+966)</option>
              <option data-country-code="SN" value="221">Senegal (+221)</option>
              <option data-country-code="CS" value="381">Serbia (+381)</option>
              <option data-country-code="SC" value="248">Seychelles (+248)</option>
              <option data-country-code="SL" value="232">Sierra Leone (+232)</option>
              <option data-country-code="SG" value="65">Singapore (+65)</option>
              <option data-country-code="SK" value="421">Slovak Republic (+421)</option>
              <option data-country-code="SI" value="386">Slovenia (+386)</option>
              <option data-country-code="SB" value="677">Solomon Islands (+677)</option>
              <option data-country-code="SO" value="252">Somalia (+252)</option>
              <option data-country-code="ZA" value="27">South Africa (+27)</option>
              <option data-country-code="ES" value="34">Spain (+34)</option>
              <option data-country-code="LK" value="94">Sri Lanka (+94)</option>
              <option data-country-code="SH" value="290">St. Helena (+290)</option>
              <option data-country-code="KN" value="1869">St. Kitts (+1869)</option>
              <option data-country-code="SC" value="1758">St. Lucia (+1758)</option>
              <option data-country-code="SD" value="249">Sudan (+249)</option>
              <option data-country-code="SR" value="597">Suriname (+597)</option>
              <option data-country-code="SZ" value="268">Swaziland (+268)</option>
              <option data-country-code="SE" value="46">Sweden (+46)</option>
              <option data-country-code="CH" value="41">Switzerland (+41)</option>
              <option data-country-code="SI" value="963">Syria (+963)</option>
              <option data-country-code="TW" value="886">Taiwan (+886)</option>
              <option data-country-code="TJ" value="7">Tajikstan (+7)</option>
              <option data-country-code="TH" value="66">Thailand (+66)</option>
              <option data-country-code="TG" value="228">Togo (+228)</option>
              <option data-country-code="TO" value="676">Tonga (+676)</option>
              <option data-country-code="TT" value="1868">Trinidad &amp; Tobago (+1868)</option>
              <option data-country-code="TN" value="216">Tunisia (+216)</option>
              <option data-country-code="TR" value="90">Turkey (+90)</option>
              <option data-country-code="TM" value="7">Turkmenistan (+7)</option>
              <option data-country-code="TM" value="993">Turkmenistan (+993)</option>
              <option data-country-code="TC" value="1649">Turks &amp; Caicos Islands (+1649)</option>
              <option data-country-code="TV" value="688">Tuvalu (+688)</option>
              <option data-country-code="UG" value="256">Uganda (+256)</option>
              <option data-country-code="GB" value="44">UK (+44)</option> 
              <option data-country-code="UA" value="380">Ukraine (+380)</option>
              <option data-country-code="AE" value="971">United Arab Emirates (+971)</option>
              <option data-country-code="UY" value="598">Uruguay (+598)</option>
              <option data-country-code="US" value="1">USA (+1)</option> 
              <option data-country-code="UZ" value="7">Uzbekistan (+7)</option>
              <option data-country-code="VU" value="678">Vanuatu (+678)</option>
              <option data-country-code="VA" value="379">Vatican City (+379)</option>
              <option data-country-code="VE" value="58">Venezuela (+58)</option>
              <option data-country-code="VN" value="84">Vietnam (+84)</option>
              <option data-country-code="VG" value="84">Virgin Islands - British (+1284)</option>
              <option data-country-code="VI" value="84">Virgin Islands - US (+1340)</option>
              <option data-country-code="WF" value="681">Wallis &amp; Futuna (+681)</option>
              <option data-country-code="YE" value="969">Yemen (North)(+969)</option>
              <option data-country-code="YE" value="967">Yemen (South)(+967)</option>
              <option data-country-code="ZM" value="260">Zambia (+260)</option>
              <option data-country-code="ZW" value="263">Zimbabwe (+263)</option>
            </optgroup>
          </select>
          <label htmlFor="contact-phoneNumber">Número de Telefone:</label>
          <input 
            placeholder='(00)123456789'
            type="text"
            value={ toPhoneNumber }
            onChange={({ target }) => setToPhoneNumber(target.value)}
          />
          <button
            onClick={ newChat }
            disabled={!(toPhoneNumber.length >= 10)}
          >
          Nova Conversa
          </button>
          { displayErrorMessage() }
        </div>
      </div>
    </div>
  );
}

export default NewChat;