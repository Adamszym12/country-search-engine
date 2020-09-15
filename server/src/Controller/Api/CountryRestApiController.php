<?php


namespace App\Controller\Api;


use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CountryRestApiController extends AbstractController
{
    /**
     * @Route("/get/countries", name="get_country_data")
     * @param Request $request
     * @return Response
     * @throws Exception
     */
    public function getCountries(Request $request)
    {
        //soap client
        $soapClient = new \SoapClient('http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL', array("connection_timeout" => 15));

        //handle request
        $content = json_decode($request->getContent(), true);

        // Made in case single country data would be needed
        if ($content['method'] == "getAllCountries") {
            return new JsonResponse($soapClient->FullCountryInfoAllCountries()->FullCountryInfoAllCountriesResult->tCountryInfo);
        }
        /*
         else if($content['method'] == "function name"){
             return new JsonResponse(...);
        }
         */

        //if method does not exist
        else {
            return new JsonResponse("Method not found", 404);
        }
    }
}